import "./types.js";
export function getFunctionParams(func) {
    let txt = func.toString();
    let start = txt.indexOf("(") + 1;
    let end = txt.indexOf(")");
    return txt.substring(start, end).split(",").map(n => n.trim());
}
export class KVP extends Object {
    Name;
    Value;
    constructor(Name, Value) {
        super();
        this.Name = Name;
        this.Value = Value;
    }
    Type;
    toString() {
        return this.Value.toString();
    }
}
class Router_ {
    static instance;
    Route(newHash) {
        const x = this.EvaluateRoute(newHash);
        x?.();
    }
    EvaluateRoute(hash) {
        if (hash === "" || hash === "#") {
            const home = this.routes.find(n => n.rawFormat == "#home");
            if (home) {
                return () => home.action();
            }
            return null;
        }
        let result = null;
        for (let i = 0; i < this.routes.length; i++) {
            let rex = new RegExp(this.routes[i].regex);
            let matches = rex.exec(hash);
            if (!matches) {
                continue;
            }
            let populatedParams = new Array();
            let funcParams = getFunctionParams(this.routes[i].action);
            matches.shift();
            matches.forEach((match, key) => {
                let value = match;
                let name = funcParams[key];
                populatedParams.push(new KVP(name, value));
            });
            if (populatedParams) {
                result = () => { this.routes[i].action(...populatedParams); };
                break;
            }
        }
        return result;
    }
    RegisterPath(format, action) {
        const index = this.routes.findIndex(n => n.rawFormat === format);
        if (index === -1) {
            this.routes.push({
                rawFormat: format,
                action: action,
                regex: this.MakeRegexString(format, ...getFunctionParams(action))
            });
        }
        else {
            this.routes[index] = {
                rawFormat: format,
                action: action,
                regex: this.MakeRegexString(format, ...getFunctionParams(action))
            };
        }
    }
    RegisterSimplePath(format, action) {
        const index = this.routes.findIndex(n => n.rawFormat === format);
        if (index === -1) {
            this.routes.push({
                rawFormat: format,
                action: action,
                regex: format
            });
        }
        else {
            this.routes[index] = {
                rawFormat: format,
                action: action,
                regex: format
            };
        }
    }
    MakeRegexString(inputFormat, ...params) {
        let format = inputFormat.toString();
        params.forEach((param, i) => {
            if (!param.toString().startsWith("{")) {
                param = `{${param}}`;
            }
            let end = format.indexOf(param.toString()) + param.toString().length;
            let separator = format.substring(end, end + 1);
            if (separator === "") {
                format = format.replace(param.toString(), `(.*)`); //last item probably 
            }
            else {
                format = format.replace(param.toString(), `([^${separator}]*)`);
            }
        });
        return format.replaceAll("/", "\\/");
    }
    ParseParams(inputFormat, hash, ...params) {
        let rex = RegExp(this.MakeRegexString(inputFormat, ...params));
        const matches = rex.exec(hash);
        if (!matches) {
            return [];
        }
        let result = new Array();
        matches.forEach((match, i) => {
            let key = params[i];
            let value = match;
            result.push(new KVP(key, value));
        });
        return result;
    }
    routes = [];
}
if (!window.Omnicatz.Router) {
    Object.defineProperty(window.Omnicatz, "Router", {
        get value() {
            if (!Router_.instance) {
                Router_.instance = new Router_();
            }
            return Router_.instance;
        }
    });
}
//# sourceMappingURL=Router.js.map