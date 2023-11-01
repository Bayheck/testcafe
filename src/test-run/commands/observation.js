import TYPE from './type';
import { ActionCommandBase } from './base';
import { positiveIntegerArgument } from './validations/argument';
import { camelCase } from 'lodash';
import { isJSExpression } from './utils';
import { executeJsExpression } from '../execute-js-expression';
import SelectorBuilder from '../../client-functions/selectors/selector-builder';
// Commands
export class WaitCommand extends ActionCommandBase {
    static methodName = camelCase(TYPE.wait);

    constructor (obj, testRun) {
        super(obj, testRun, TYPE.wait);
    }

    getAssignableProperties () {
        return [
            { name: 'timeout', type: positiveIntegerArgument, required: true },
        ];
    }
}

export class ExecuteClientFunctionCommandBase extends ActionCommandBase {
    constructor (obj, testRun, type) {
        super(obj, testRun, type, false);
    }

    getAssignableProperties () {
        return [
            { name: 'instantiationCallsiteName', defaultValue: '' },
            { name: 'fnCode', defaultValue: '' },
            { name: 'args', defaultValue: [] },
            { name: 'dependencies', defaultValue: [] },
        ];
    }
}

export class ExecuteClientFunctionCommand extends ExecuteClientFunctionCommandBase {
    static methodName = TYPE.executeClientFunction;

    constructor (obj, testRun) {
        super(obj, testRun, TYPE.executeClientFunction);
    }
}

export class ExecuteSelectorCommand extends ExecuteClientFunctionCommandBase {
    static methodName = TYPE.executeSelector;

    constructor (obj, testRun) {
        super(obj, testRun, TYPE.executeSelector);
    }

    getAssignableProperties () {
        return [
            { name: 'visibilityCheck', defaultValue: false },
            { name: 'timeout', defaultValue: null },
            { name: 'apiFnChain' },
            { name: 'needError' },
            { name: 'index', defaultValue: 0 },
            { name: 'strictError' },
        ];
    }
}

export class DebugCommand extends ActionCommandBase {
    static methodName = camelCase(TYPE.debug);

    constructor (obj, testRun,) {
        super(obj, testRun, TYPE.debug);
    }

    getAssignableProperties () {
        debugger;
        return [
            { name: 'selector', init: initSelector, required: true },
        ];
    }
}

function initSelector (name, val, { testRun, ...options }) {
    debugger;
    if (val instanceof ExecuteSelectorCommand)
        return val;

    try {
        debugger;
        if (isJSExpression(val))
            val = executeJsExpression(val.value, testRun, options);
        debugger;
        const { skipVisibilityCheck, ...builderOptions } = options;

        debugger;
        const builder = new SelectorBuilder(val, {
            visibilityCheck: !skipVisibilityCheck,
            ...builderOptions,
        }, { instantiation: 'Selector' });

        debugger;
        return builder.getCommand();
    }
    catch (err) {
        throw new Error(name, err);
    }
}
