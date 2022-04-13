import Index from '../views/index/index'
import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path: '/',
        name: 'Index',
        component: Index,
    },
    {
        path: '/auth',
        component: () => import("../views/user/Auth"),
        name: "Auth",
        children: [
            {
                path: '',
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
                path: 'settings',
                name: 'RepoSettings',
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
        path: '/:username/:repo/editor',
        name: 'RepoEditor',
        component: () => import('../components/repo-editor/RepoEditor')
    },
    {
        path: '/create',
        name: 'CreateRepo',
        component: () => import('../views/repo/RepoCreate')
    },
    {
        path: '/search',
        name: 'Search',
        component: () => import('../views/Search')
    },
    {
        path: '/bookmarks',
        name: 'Bookmarks',
        component: () => import('../views/Bookmarks')
    },
    {
        path: '/current-book',
        name: 'CurrentBook',
        component: () => import('../views/CurrentBook')
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

// router.beforeEach(async (to) => {
//     console.log("matches", to.matched.slice(-1)[0])
//     let metaInfo =  typeof to.matched.slice(-1)[0].components.default  === "function" ?
//         (await to.matched.slice(-1)[0].components.default()).default.metaInfo :
//         to.matched.slice(-1)[0].components.default.metaInfo
//     if (metaInfo) {
//         store.commit('setTitle', metaInfo.title)
//     }else {
//         store.commit("setTitle", "default")
//     }
//     return true
// })

export default router
