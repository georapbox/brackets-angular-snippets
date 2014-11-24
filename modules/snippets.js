define(function (require, exports, module) {
    'use strict';
    
    var snippets = {},
        d = {
            begin: "directive('{name}', [function () {\n\treturn {\n",
            end: "\t};\n}])",
            restrict: "\t\trestrict: '{A}',\n",
            scope: "\t\tscope: {},\n",
            template: "\t\ttemplate: '',\n",
            templateUrl: "\t\ttemplateUrl: '',\n",
            transclude: "\t\ttransclude: true,\n",
            link: "\t\tlink: function (scope, element, attrs) {\n\n\t\t}\n"
        };
    
    // Module snippet
    snippets.ngmodule = "angular.module('{name}', [])";
    
    // Config snippet
    snippets.ngconfig = "config([function () {\n\n" +
        "}])";
    
    // Config with $routeProvider
    snippets['ngconfig[$routeProvider]'] = "config(['$routeProvider', function ($routeProvider) {\n" +
        "\t$routeProvider.when('/{route}', {\n" +
        "\t\ttemplateUrl: '{name}.html',\n" +
        "\t\tcontroller: '{Name}'\n" +
        "\t}).otherwise({ redirectTo: '/{route}' });\n" +
        "}])";
    
    snippets.ngwhen = "when('/{route}', {\n" +
        "\ttemplateUrl: '{name}.html',\n" +
        "\tcontroller: '{Name}'\n" +
        "})";
    
    snippets.ngotherwise = "otherwise({ redirectTo: '/{route}' })";
    
    // Run snippet
    snippets.ngrun = "run([function () {\n\n" +
        "}])";
    
    // Controller snippet
    snippets.ngcontroller = "controller('{Name}', ['$scope', function ($scope) {" +
        "\n\n" +
        "}])";
    
    // Directives Snippets
    snippets.ngdirective = d.begin + d.restrict + d.link + d.end;
    
    // Factory snippet
    snippets.ngfactory = "factory('{name}', [function () {\n" +
        "\treturn {\n\n" +
        "\t};\n" +
        "}])";
    
    // Service snippet
    snippets.ngservice = "service('{name}', [function () {" +
        "\n\n" +
        "}])";
    
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