import "./Omnicatz.js";

export interface MetaDataLike {
    Get(object: unknown): TypeMetadataLike;
    GetAnnotate(typeName: string): Array<AnnotationDataLike>;
    Annotate(type: string, annotationData: AnnotationDataLike): void;
    Remove(type: string, annotationData: AnnotationDataLike): void;
}

class MetaData implements MetaDataLike {

    #annotations: Map<string, Array<AnnotationDataLike>> = new Map();

    public GetAnnotate(typeName: string): Array<AnnotationDataLike> {
        return this.#annotations.get(typeName);
    }

    Annotate(type: string, annotationData: AnnotationDataLike) {
        if (this.#annotations.has(type)) {
            this.#annotations.set(type, []);
        }

        const list = this.#annotations.get(type);

        if (list.indexOf(annotationData) === -1) {
            list.push(annotationData);
        }
    }


    Remove(type: string, annotationData: AnnotationDataLike) {
        if (this.#annotations.has(type)) {
            this.#annotations.set(type, []);
        }

        const list = this.#annotations.get(type);
        const index = list.indexOf(annotationData);
        if (index !== -1) {
            list.splice(index, 1);
        }
    }




    public Get(object: unknown) {
        let result = typeof<string>object;
        if (result !== "object") {
            return <TypeMetadataLike>{ Name: result, IsPrimitive: true };
        }

        result = Object.getPrototypeOf(object).constructor.name;
        return <TypeMetadataLike>{ Name: result, IsPrimitive: false };
    }

    static instance: MetaData;

}

interface AnnotationDataLike {
}
interface TypeMetadataLike {
    Name: string;
    IsPrimitive: boolean;
    Anotations: Map<string, AnnotationDataLike>;
}

if (!window.Omnicatz.MetaData) {
    Object.defineProperty(window.Omnicatz, "MetaData", {
        get value(): MetaDataLike {
            if (!MetaData.instance) {
                MetaData.instance = new MetaData();
            }
            return MetaData.instance;
        }
    })
}