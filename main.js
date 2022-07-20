const app = Vue.createApp({
  data() {
    return {
      card: [],
      inventory: 14,
      premium: true,
    };
  },
  methods: {
    updateCard(id) {
      if (this.inventory > this.card.length) {
        this.card.push(id);
      }
    },
    downGradeCard() {
      if (this.card.length > 0) {
        this.card.length -= 1;
      }
    },
  },
});
