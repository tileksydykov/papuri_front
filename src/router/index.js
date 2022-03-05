import Index from '../views/index/index'
import {createRouter, createWebHashHistory} from "vue-router";

const routes = [
    {
        path: '/',
        name: 'Index',
        component: Index,
    },
    {
        path: '/popular',
        name: 'Popular',
        component: ()=> import('../views/index/AllBooks'),
    },
    {
        path: '/auth',
        component: () => import("../views/user/Auth"),
        children: [
            {
                path: 'login',
                name: 'Login',
                component: () => import("../components/auth/Login"),
            },
            {
                path: 'registration',
                name: 'Reg',
                component: () => import("../components/auth/Registration"),
            }
        ]
    },
    {
        path: '/chapter/:id',
        name: 'Chapter',
        component: () => import("../views/repo/ChapterView"),
    },
    {
        path: '/:username',
        name: 'Profile',
        component: () => import('../views/user/Profile'),
        children : [
            {
                path: 'settings',
                name: 'Settings',
                component: () => import("../components/profile/Settings"),
            }, {
                path: 'repos',
                name: 'MyRepos',
                component: () => import("../components/profile/MyRepos"),
            }, {
                path: '',
                name: 'Activity',
                component: () => import("../components/profile/Activity"),
            }
        ]
    },
    {
        path: '/:username/:repo',
        name: 'Repo',
        component: () => import('../views/repo/RepoView'),
        children: [
            {
                path: '',
                name: 'RepoOverview',
                component: () => import('../components/book/Chapters')
            },
            {
                path: 'volume',
                name: 'Volumes',
                component: () => import('../components/book/Volumes')
            },
            {
                path: 'editor',
                name: 'RepoEditor',
                component: () => import('../components/repo-editor/RepoEditor')
            },
            {
                path: 'settings',
                name: 'BookSettings',
                component: () => import('../components/book/settings/Index'),
                children: [
                    {
                        path: '',
                        name: 'EditBook',
                        component: () => import('../components/book/settings/Edit')
                    }, {
                        path: 'maintainers',
                        name: 'BookMaintainers',
                        component: () => import('../components/book/settings/Maintainers')
                    }
                ],
            }
        ]
    },
    {
        path: '/book/create',
        name: 'CreateBook',
        component: () => import('../views/repo/RepoCreate')
    },
    {
        path: '/editor/:id',
        name: 'Editor',
        component: () => import('../components/repo-editor/RepoEditor')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
