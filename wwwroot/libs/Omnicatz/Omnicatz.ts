import { MetaDataLike } from "./MetaData.js";
import { ComponentRegistryLike, RouterLike } from "./types.js";

export interface OmnicatzsLike {
    Components: ComponentRegistryLike;
    Router: RouterLike;
    MetaData: MetaDataLike;
}
declare global {
    interface Window {
        Omnicatz: OmnicatzsLike,
    }
}

if (!window.Omnicatz){
    window.Omnicatz = <OmnicatzsLike>{};

}