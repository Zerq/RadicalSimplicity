export function Route(path) {
    return (ctor) => {
        const tag = window.Omnicatz.Components.GetTag(ctor);
        window.Omnicatz.Router.RegisterPath(path, (...params) => window.Omnicatz.Router.DefaultRouteAction?.(path, ctor, tag, params));
    };
}
//# sourceMappingURL=types.js.map