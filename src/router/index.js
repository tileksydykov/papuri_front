import Index from '../views/index/index'
import {createRouter, createWebHistory} from "vue-router";

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
                component: () => import('../components/repo/Overview')
            },
            {
                path: 'volume',
                name: 'Volumes',
                component: () => import('../components/repo/Volumes')
            },
            {
                path: 'editor',
                name: 'RepoEditor',
                component: () => import('../components/repo-editor/RepoEditor')
            },
            {
                path: 'settings',
                name: 'BookSettings',
                component: () => import('../components/repo/settings/Index'),
                children: [
                    {
                        path: '',
                        name: 'EditBook',
                        component: () => import('../components/repo/settings/Edit')
                    }, {
                        path: 'maintainers',
                        name: 'BookMaintainers',
                        component: () => import('../components/repo/settings/Maintainers')
                    }
                ],
            }
        ]
    },
    {
        path: '/repo/create',
        name: 'CreateRepo',
        component: () => import('../views/repo/RepoCreate')
    },
    {
        path: '/editor/:id',
        name: 'Editor',
        component: () => import('../components/repo-editor/RepoEditor')
    },
    {
        path: '/media',
        name: 'Media',
        component: () => import('../views/user/Media')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
