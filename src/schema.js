import example from './modules/example';
import exampleDucks from './modules/example/ducks';

const routes = [...example];

const modules = { example: exampleDucks };

export { routes, modules };
