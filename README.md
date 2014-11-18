# [Angular Snippets for Brackets](http://)

A collection of [Angular](https://angularjs.org/) snippets for [Brackets](http://brackets.io/) editor.

## Install

#### Git Clone
1. Under main menu select **Help > Show Extensions Folder**
2. Git clone this repository inside the folder user.

#### Extension Manager
1. Under main menu select **File > Extension Manager...**
2. Search for "Angular snippets"
3. Click "Install"

## How to use
1. **Enable Angular Snippets**<br/>
   Under main menu select **Edit > Enable Angular Snippets** or<br/> open the Preferences File and add **"angular-snippets.enabled": true**.
2. Enter a snippet and hit the **Tab** key.

## Snippets list

- **ngmodule =>**

```js
angular.module('{name}', [])
```

- **ngconfig =>**

```js
config([function () {

}])
```

- **ngconfig[$routeProvider]**

```js
config(['$routeProvider', function ($routeProvider) {
	$routeProvider.when('/{route}', {
		templateUrl: '{name}.html',
		controller: '{Nane}'
	}).otherwise({ redirectTo: '/{route}' });
}])
```

- **ngwhen**

```js
when('/{route}', {
	templateUrl: '{name}.html',
	controller: '{Name}'
})
```

- **ngotherwise**

```js
otherwise({ redirectTo: '/{route}' })
```

- **ngrun**

```js
run([function () {

}])
```

- **ngcontroller =>**

```js
controller('{Name}', ['$scope', function ($scope) {

}])
```

- **ngservice =>**

```js
service('{name}', [function () {

}])
```

- **ngfactory =>**

```js
factory('{name}', [function () {
	return {

	};
}])
```

- **ngdirective =>**

```js
directive('{name}', [function () {
	return {
		restrict: '{A}',
		link: function (scope, element, attrs) {

		}
	};
}])
```

### Directives available options
Directives can be customized at will. Here is a list of all the available options:

- scope
- template
- templateUrl
- transclude

**NOTE:** Options are sperated by commas (,) **without spaces**.

For example:

 - <code>ngdirective[template]</code> will create snippet:
```js
directive('directive-name', [function () {
	return {
		restrict: '{A}',
		template: '',
		link: function (scope, element, attrs) {

		}
	};
}]).
```

- <code>ngdirective[scope,template,transclude]</code> will create snippet:
```js
directive('directive-name', [function () {
	return {
		restrict: '{A}',
        scope: {},
		template: '',
        transclude: true,
		link: function (scope, element, attrs) {

		}
	};
}])
```

## Snippets combinations
You can combine snippets together like this:

<code>ngmodule.ngconfig[$routeProvider].ngcontroller.ngdirective[scope,template].ngfactory</code> will create snippet:
```js
angular.module('{name}', []).controller('{Name}', ['$scope', function ($scope) {

}]).directive('{name}', [function () {
	return {
		restrict: '{A}',
		scope: {},
		template: '',
		link: function (scope, element, attrs) {

		}
	};
}]).factory('{name}', [function () {
	return {

	};
}]);
```
