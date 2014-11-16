define(function (require, exports, module) {
    'use strict';
    
    var snippets = {},
        d = {
            begin: "directive('directive-name', [function () {\n\treturn {\n",
            end: "\t};\n}]).\n",
            restrict: "\t\trestrict: '',\n",
            scope: "\t\tscope: {},\n",
            template: "\t\ttemplate: '',\n",
            templateUrl: "\t\ttemplateUrl: '',\n",
            transclude: "\t\ttransclude: true,\n",
            link: "\t\tlink: function (scope, element, attrs) {\n\n\t\t}\n"
        };
    
    // Module snippet
    snippets.module = 'angular.module(\'module-name\', []).\n';
    
    // Controller snippet
    snippets.controller = "controller('controller-name', ['$scope', function ($scope) {" +
        "\n\n" +
        "}]).\n";
    
    // Directives Snippets
    snippets.directive = d.begin + d.restrict + d.link + d.end;
    
    // Factory snippet
    snippets.factory = "factory('factory-name', [function () {" +
        "\n\n" +
        "}]).\n";
    
    // Service snippet
    snippets.service = "service('service-name', [function () {" +
        "\n\n" +
        "}]).\n";
    
    /**
     * Creates a custom directive snippet with options.
     * @param snippetKey {String} The key of the snippet.
     */
    function generateCustomDirective(snippetKey) {
        var opts,               // Holds the options specified by user.
            customDirective;    // The final directive string.
        
        if (snippets[snippetKey]) {
            // If snippet already exists and returns it.
            return snippets[snippetKey];
        } else {
            // If snippet does not exist, generate it.
            // Get options specified by user.
            opts = snippetKey.substr(snippetKey.indexOf('[') + 1);
            opts = opts.substring(0, opts.length - 1);
            // Create an array with all the options.
            opts = opts.split(',');
            
            // Build the final directive string.
            customDirective = d.begin + d.restrict;
            
            opts.forEach(function (o) {
                if (o in d) {
                    customDirective += d[o];
                }
            });
            
            customDirective += d.link + d.end;
            
            snippets[snippetKey] = customDirective;
            
            return snippets[snippetKey];
        }
    }
    
    // Exports
    exports.snippets = snippets;
    exports.generateCustomDirective = generateCustomDirective;
});



//module.controller.factory.directive[transclude,scope]

//module.directive[scope,template,transclude]




