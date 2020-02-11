const state = (state) => ({
    items: [],
    qty: 0,
    subtotal: 0,
    discount: 0,
    total: 0,
    offer_total: 0,
    showCart: false,
    promo: null
})

// getters
const getters = {
    showCart(state) {
        return state.showCart
    },
    checkCart: state => ({ pid, vid }) => { // Returns true when there is item in cart
        var found = state.items.some(function (el) {
            return el.product._id === pid && el.variant._id === vid;
        });
        return found
    },
    getQty: state => ({ pid, vid }) => { // Gets cart qty of that item
        for (let i of state.items) {
            if (i.product._id === pid && i.variant._id === vid) {
                return i.qty
            }
        }
    },
}
const actions = {
    async fetch({ commit, state, getters }) {// This is only to get data from saved cart
        try {
            const data = await this.$axios.$get('api/cart')
            commit('setCart', data)
            return data
        }
        catch (e) { }
    },
    async addToCart({ commit }, payload) {
        try {
            const data = await this.$axios.$post("api/cart/add", payload);
            commit('setCart', data)
        }
        catch (e) {
            commit('setErr', e, { root: true })
        }
    },
    applyDiscount({ commit }, payload) {
        commit('applyDiscount', payload)
    },
    async checkout({ commit, state, rootState, getters }, { paymentMethod, address }) {
        paymentMethod = paymentMethod || 'COD'
        switch (paymentMethod) {
            case "COD":
                try {
                    commit('busy', true, { root: true })
                    let order = await this.$axios.$post('api/orders', { address, paymentMethod })
                    this.$router.push('/order-success?id=' + order._id + '&amount=' + order.amount.total)
                } catch (err) {
                    commit('setErr', err, { root: true })
                }
                finally {
                    commit('busy', false, { root: true })
                }
                break;
            case "Stripe":
                commit('setErr', 'Stripe not implemented yet. Proceed with COD', { root: true })
                break;
            default:
                commit('setErr', 'The checkout service ' + paymentMethod + ' not yet implemented', { root: true })
                console.log("Unknown checkout service: " + paymentMethod);
                break;
        }
    },
}

const mutations = {
    setPromo(state, data) {
        state.promo = data.details
        state.total = data.amount
    },
    setCart(state, data) {
        if (!data) { return }
        state.items = data.items || []
        state.qty = data.qty
        state.discount = data.discount || 0
        state.subtotal = data.subtotal
        state.total = data.total
        state.offer_total = data.offer_total
    },
    toggleCart(state, payload) {
        state.showCart = payload
    },
    applyDiscount(state, amount) {
        state.discount = amount
    },
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

