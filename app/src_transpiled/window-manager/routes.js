"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoute = exports.routes = void 0;
const DEFAULT_MIN_HEIGHT = 600;
const DEFAULT_MIN_WIDTH = 600;
exports.routes = {
    about: {
        hash: '/about',
        options: {
            minimizable: false,
            maximizable: false,
            resizable: false,
            height: __WIN32__ || __LINUX__ ? 530 : 510,
            width: 760,
        },
    },
    containers: {
        hash: '/dashboard',
        options: {
            minHeight: DEFAULT_MIN_HEIGHT,
            minWidth: DEFAULT_MIN_WIDTH,
        },
    },
    images: {
        hash: '/images',
        options: {
            minHeight: DEFAULT_MIN_HEIGHT,
            minWidth: DEFAULT_MIN_WIDTH,
        },
    },
    settings: {
        hash: '/settings',
        options: {
            minHeight: DEFAULT_MIN_HEIGHT,
            minWidth: DEFAULT_MIN_WIDTH,
        },
    },
    'settings/update': {
        hash: '/settings/update',
        options: {
            minHeight: DEFAULT_MIN_HEIGHT,
            minWidth: DEFAULT_MIN_WIDTH,
        },
    },
    troubleshoot: {
        hash: '/troubleshoot',
        options: {
            minHeight: DEFAULT_MIN_HEIGHT,
            minWidth: DEFAULT_MIN_WIDTH,
        },
    },
    support: {
        hash: '/support',
        options: {
            minHeight: DEFAULT_MIN_HEIGHT,
            minWidth: DEFAULT_MIN_WIDTH,
        },
    },
    experimental: {
        hash: '/experimental',
        options: {
            minHeight: DEFAULT_MIN_HEIGHT,
            minWidth: DEFAULT_MIN_WIDTH,
        },
    },
    tutorial: {
        hash: '/tutorial',
        options: {
            minHeight: DEFAULT_MIN_HEIGHT,
            minWidth: DEFAULT_MIN_WIDTH,
        },
    },
    'message-box': {
        hash: '/message-box',
        options: {
            height: 300,
            width: 700,
        },
    },
    'new-license': {
        hash: '/new-license',
        options: {
            width: 800,
            height: 600,
            minWidth: 500,
            minHeight: 400,
        },
    },
};
const getRoute = (opts) => {
    const route = opts.name;
    if (route) {
        const routeConfig = Object.values(exports.routes).find((r) => `/${route}`.startsWith(r.hash));
        if (routeConfig) {
            return {
                ...routeConfig,
                hash: `/${route}`,
            };
        }
    }
    return exports.routes.containers;
};
exports.getRoute = getRoute;
