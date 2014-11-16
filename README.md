# [Angular Snippets for Brackets](http://)

A collection of [Angular](https://angularjs.org/) snippets for [Brackets](http://brackets.io/) editor.

## Install

#### Git Clone
1. Under main menu select **Help > Show Extensions Folder**
2. Git clone this repository inside the folder user.

#### Extension Manager (NOT AVAILABLE YET)
1. Under main menu select **File > Extension Manager...**
2. Search for "Angular snippets"
3. Click "Install"

## How to use
1. **Enable Angular Snippets**<br/>
   Under main menu select **Edit > Enable Angular Snippets** or<br/> open the Preferences File and add **"angular-snippets.enabled": true**.
2. Enter a snippet and hit the **Tab** key.

## Snippets list

- **module =>**

```js
angular.module('module-name', []).
```

- **controller =>**

```js
controller('controller-name', ['$scope', function ($scope) {

}]).
```

- **service =>**

```js
service('service-name', [function () {

}]).
```

- **factory =>**

```js
factory('factory-name', [function () {

}]).
```

- **directive =>**

```js
directive('directive-name', [function () {
	return {
		restrict: '',
		link: function (scope, element, attrs) {

		}
	};
}]).
```

### Directives available options
Directives can be customized at will. Here is a list of all the available options:

- scope
- template
- templateUrl
- transclude

**NOTE:** Options are sperated by commas (,) **without spaces**.

For example:

 - <code>directive[template]</code> will create snippet:
```js
directive('directive-name', [function () {
	return {
		restrict: '',
		template: '',
		link: function (scope, element, attrs) {

		}
	};
}]).
```

- <code>directive[scope,template,transclude]</code> will create snippet:
```js
directive('directive-name', [function () {
	return {
		restrict: '',
        scope: {},
		template: '',
        transclude: true,
		link: function (scope, element, attrs) {

		}
	};
}]).
```

## Snippets combinations
You can combine snippets together like this:

<code>module.controller.directive[scope,template]</code> will create snippet:
```js
angular.module('module-name', []).
controller('controller-name', ['$scope', function ($scope) {

}]).
directive('directive-name', [function () {
	return {
		restrict: '',
		scope: {},
		template: '',
		link: function (scope, element, attrs) {

		}
	};
}]).
```
