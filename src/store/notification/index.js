export default {
    namespaced: true,
    state: {
        notifications: [],
    },
    mutations: {
        addNotification: (state, data) => state.notifications.push(data),
        deleteNotification: (state, data) => state.notifications.splice(
            state.notifications.indexOf(
                state.notifications.find(n => n.id === data.id)), 1),
    },
    getters: {
        getNotifications: state => state.notifications
    },
    actions: {
        pushNotification(ctx, notification) {
            notification.id = Math.round(Math.random() * 100000)
            notification.time = 6
            ctx.commit("addNotification", notification)
        }
    }
}
