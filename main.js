/**
 * @package brackets-angular-snippets
 * @title Angular Snippets
 * @desc A collection of AngularJS snippets for Brackets
 * @version 0.1.1
 * @author George Raptis <https://github.com/georapbox>
 * @repository https://github.com/georapbox/brackets-angular-snippets
 * @license Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license
 */
define(function (require, exports, module) {
    'use strict';

    var AppInit = brackets.getModule('utils/AppInit'),
        EditorManager = brackets.getModule('editor/EditorManager'),
        PreferencesManager = brackets.getModule('preferences/PreferencesManager'),
        Menus = brackets.getModule('command/Menus'),
        CommandManager = brackets.getModule('command/CommandManager'),
        WorkspaceManager = brackets.getModule('view/WorkspaceManager'),
        ExtensionUtils = brackets.getModule('utils/ExtensionUtils'),
        KeyEvent = brackets.getModule('utils/KeyEvent'),
        Strings = require('strings'),
        Snippets = require('modules/snippets'),
        snippets = Snippets.snippets,
        enabled = false,
        prefs = PreferencesManager.getExtensionPrefs('angular-snippets'),
        COMMAND_NAME = Strings.COMMAND_NAME,
        COMMAND_DOCS = Strings.COMMAND_DOCS,
        COMMAND_ID = 'georapbox-angular-snippets',
        COMMAND_DOCS_ID = 'georapbox-angular-snippets-docs',
        panelTemplate = require('text!html/docs-panel.html'),
        panelHeaderTemplate = require('text!html/docs-panel-header.html'),
        panel;

	function trim(str, chr) {
		var rgxtrim = (!chr) ? new RegExp('^\\s+|\\s+$', 'g') : new RegExp('^'+chr+'+|'+chr+'+$', 'g');
		return str.replace(rgxtrim, '');
	}
	function rtrim(str, chr) {
		var rgxtrim = (!chr) ? new RegExp('\\s+$') : new RegExp(chr+'+$');
		return str.replace(rgxtrim, '');
	}
	function ltrim(str, chr) {
		var rgxtrim = (!chr) ? new RegExp('^\\s+') : new RegExp('^'+chr+'+');
		return str.replace(rgxtrim, '');
	}
	
    /**
     * Toggles snippets enabled/disabled.
     */
    function toggleSnippets() {
        enabled = !enabled;
        prefs.set('enabled', enabled);
        prefs.save();
        CommandManager.get(COMMAND_ID).setChecked(enabled);
    }
   
    /**    
     * Applies user's preferences.
     */
    function applyPreferences() {
        enabled = prefs.get('enabled');
        CommandManager.get(COMMAND_ID).setChecked(enabled);
    }
    
    /**
     * Parses a line, splitting into words.
     * @param
     */
    function parseLine(line, cursorPosition) {
        var words;
        line = line.substring(0, cursorPosition);
        line = ltrim(line);
		words = line.split(' '); // /\W/
        return words[words.length - 1];
    }
    
    /**	
	 * Creates bottom panel.
	 */
	function createBottomPanel() {
		panel = WorkspaceManager.createBottomPanel('georapbox.angular.snippets.panel', $(panelTemplate), 100);
		
		var panelHeader = $('#georapbox-angular-snippets-panel-header'),
			resultsHTML = Mustache.render(panelHeaderTemplate, {
				strings: Strings
			});
		
		panelHeader.empty().append(resultsHTML);
	}
    
    /**    
     * Toggles bottom panel state.
     */
    function toggleDocsPanel() {
        if (panel.isVisible()) {
            panel.hide();
            CommandManager.get(COMMAND_DOCS_ID).setChecked(false);
        } else {
			panel.show();
            CommandManager.get(COMMAND_DOCS_ID).setChecked(true);
        }
    }
    
    function keyEventHandler($event, editor, event) {
        enabled = prefs.get('enabled');
        
        var cursorPosition,
            line,
            snippetKey,
            start;
        
        if (enabled) {
            if ((event.type === 'keydown') && (event.keyCode === KeyEvent.DOM_VK_TAB)) {
                cursorPosition = editor.getCursorPos();
                line = editor.document.getLine(cursorPosition.line);
                snippetKey = parseLine(line, cursorPosition.ch);
                
                // If snippet already exists in snippets object, create the snippet in editor.
                // Else if snippet is not available, assume that user has typed a multi snippet expression,
                // and generate the combined snippet string.
                if (snippets[snippetKey]) {
                    start = {
                        line: cursorPosition.line,
                        ch: cursorPosition.ch - snippetKey.length
                    };
                    
                    editor.document.replaceRange(snippets[snippetKey], start, cursorPosition);
                    event.preventDefault();
                } else {
                    var sk = snippetKey.split('.'),
                        multiSnippet = '';
                    
                    start = {
                        line: cursorPosition.line,
                        ch: cursorPosition.ch - snippetKey.length
                    };
                    
                    sk.forEach(function (item) {
                        // Item already exists in snippets object as is.
                        if (item in snippets) {
                            multiSnippet += snippets[item] + '.';
                            return false;
                        }
                        
                        // Item does not exist in snippets object.
                        if (item.indexOf('[') !== -1) {
                            var newItem = item;
                            item = item.substr(0, item.indexOf('['));
                            
                            if (item in snippets) {
                                switch (item) {
                                    case 'ngdirective':
                                        multiSnippet += Snippets.generateCustomDirective(newItem) + '.';
                                    break;
                                }
                            }
                        }
                    });
                    
                    // If multiSnippet is not an ampty string,
                    // it means that a combined snippet string is typed.
                    if (multiSnippet !== '') {
                        if (multiSnippet.charAt(multiSnippet.length - 1) === '.') {
                            multiSnippet = multiSnippet.substr(0, multiSnippet.length - 1) + ';';
                        } 
                        
                        editor.document.replaceRange(multiSnippet, start, cursorPosition);
                        event.preventDefault();
                    }
                }
            }
        }    
    }
    
    /**
     * Handles editor change event.
     * Removes key events from lost editor.
     * Assigns key events to focused editor.
     * @param $event {Object}
     * @param focusedEditor
     * @param lostEditor
     */
    function activeEditorChangeHandler($event, focusedEditor, lostEditor) {
        enabled = prefs.get('enabled');
        
        if (lostEditor) {
            $(lostEditor).off('keyEvent', keyEventHandler);
        }
        
        if (focusedEditor) {
            $(focusedEditor).on('keyEvent', keyEventHandler);
        }
    }
    
    /**
     * Loads external stylesheets.
     */
    function addStyles() {
        ExtensionUtils.loadStyleSheet(module, 'css/docs-panel.less');
    }
    
    // HTML ready, Extensions ready.
    AppInit.appReady(function () {
        enabled = prefs.get('enabled');
        
        // Load external stylesheets.
        addStyles();
        
        // Create docs bottom panel.
        createBottomPanel();
        
        // Register toggle command and add it to Edit menu.
        CommandManager.register(COMMAND_NAME, COMMAND_ID, toggleSnippets);
        CommandManager.register(COMMAND_DOCS, COMMAND_DOCS_ID, toggleDocsPanel);
        
        // Add items on menu.
        var menu = Menus.getMenu(Menus.AppMenuBar.EDIT_MENU);
        menu.addMenuDivider();
        menu.addMenuItem(COMMAND_ID);
        menu.addMenuItem(COMMAND_DOCS_ID);
        menu.addMenuDivider();
        
        var currentEditor = EditorManager.getCurrentFullEditor();
        $(currentEditor).on('keyEvent', keyEventHandler);
        $(EditorManager).on('activeEditorChange', activeEditorChangeHandler);
        
        prefs.on('change', applyPreferences);
        applyPreferences();
        
        // Add docs panel event handlers.
        var docspanel = $('#georapbox-angular-snippets-panel');
        docspanel.on('click', '.close', toggleDocsPanel);
    });
});