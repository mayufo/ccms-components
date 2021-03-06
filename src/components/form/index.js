/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2016-03-17
 */

import angular from 'angular';

import './_form.scss';
import ValidatorService from './ValidatorService';
import ValidatorsCtrl from './ValidatorsCtrl';
import ValidatorCtrl from './ValidatorCtrl';

const validatorsDDO = {
	name: 'ccValidators',
	restrict: 'A',
	require: {
		formCtrl: '?form'
	},
	controller: ValidatorsCtrl,
	controllerAs: '$$validatorsCtrl',
	bindToController: {
		validators: '<',
		name: '@'
	}
};

const validatorDDO = {
	restrict: 'A',
	require: {
		ngModelCtrl: 'ngModel',
		validatorsCtrl: '?^^ccValidators',
		formCtrl: '?^^form'
	},
	controller: ValidatorCtrl,
	controllerAs: '$$validatorCtrl',
	bindToController: {
		validator: '@'
	}
};

const forbidFormNativeValidator = {

	compile(element) {
		element[0].setAttribute('novalidate', 'true');
	}
};

export default angular
	.module('ccms.components.form', [])
	.directive('ccValidators', () => validatorsDDO)
	.directive('ccValidator', () => validatorDDO)
	// 对built-in的表单添加额外逻辑
	.directive('form', () => forbidFormNativeValidator)
	.value('$ccValidator', ValidatorService, '$Validator 服务将在8.30之后废弃,请尽早使用 $ccValidator 服务代替!')
	.deprecatedDirective('validators', () => validatorsDDO)
	.deprecatedDirective('validator', () => validatorDDO)
	.deprecatedValue('$Validator', ValidatorService)
	.name;
