import "./Omnicatz.js";
class MetaData {
    #annotations = new Map();
    GetAnnotate(typeName) {
        return this.#annotations.get(typeName);
    }
    Annotate(type, annotationData) {
        if (this.#annotations.has(type)) {
            this.#annotations.set(type, []);
        }
        const list = this.#annotations.get(type);
        if (list.indexOf(annotationData) === -1) {
            list.push(annotationData);
        }
    }
    Remove(type, annotationData) {
        if (this.#annotations.has(type)) {
            this.#annotations.set(type, []);
        }
        const list = this.#annotations.get(type);
        const index = list.indexOf(annotationData);
        if (index !== -1) {
            list.splice(index, 1);
        }
    }
    Get(object) {
        let result = typeof object;
        if (result !== "object") {
            return { Name: result, IsPrimitive: true };
        }
        result = Object.getPrototypeOf(object).constructor.name;
        return { Name: result, IsPrimitive: false };
    }
    static instance;
}
if (!window.Omnicatz.MetaData) {
    Object.defineProperty(window.Omnicatz, "MetaData", {
        get value() {
            if (!MetaData.instance) {
                MetaData.instance = new MetaData();
            }
            return MetaData.instance;
        }
    });
}
//# sourceMappingURL=MetaData.js.map