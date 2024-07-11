import { defineStore } from 'pinia';
// import Swal from 'sweetalert2';

export const useMainStore = defineStore('main', {
  state: () => ({
    items: [],
    discountedPrice: null,
    checkoutPrice:null,
    orders: [],
    plan:null,
  }),
  getters: {
    totalPrice() {
      return this.items.reduce((total, item) => {
        const itemPrice = item.product.price; // Adjust based on your product structure
        return total + itemPrice * item.quantity;
      }, 0);
    }
  },
  actions: {
    async addToCart(product, selectedOption) {
      const existingItemIndex = this.items.findIndex(item => item.product.id === product.id && item.selectedOption === selectedOption);

      if (existingItemIndex !== -1) {
        const updatedItems = [...this.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        };
        this.items = updatedItems;
      } else {
        this.items = [
          ...this.items,
          { product, selectedOption, quantity: 1, discountedPrice: product.discount_price }
        ];
      }

      // Show success message
      Swal.fire({
        title: "Added successfully",
        icon: "success",
        toast: true,
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      });

      await this.saveCartToSupabase();
    },

    async removeFromCart(index) {
      if (index >= 0 && index < this.items.length) {
        const updatedItems = [...this.items];
        updatedItems[index] = {
          ...updatedItems[index],
          quantity: updatedItems[index].quantity - 1,
        };

        if (updatedItems[index].quantity <= 0) {
          updatedItems.splice(index, 1);
        }

        this.items = updatedItems;

        await this.saveCartToSupabase();
      } else {
        console.error('Invalid index or item does not exist:', index);
        // Handle error or edge case as needed
      }
    },

    async clearCart() {
      this.items = [];
      await this.saveCartToSupabase();
    },

    async saveOrder() {
      const supabase = useSupabaseClient();
      const user = useSupabaseUser();

      if (!user) {
        console.error('User not authenticated.');
        return;
      }

      const { data:userdata, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error fetching session:', error.message);
        // Handle error as needed
        return;
      }

      // const supabaseUserId = data.session.user.id;

      const order = this.orders

      try {
        const { data, error } = await supabase
          .from('user_orders')
          .insert({
            uid: (userdata.session.user.id),
            order_details: order,
            order_status: order.status?order.status:JSON.stringify(order.invoice.transaction_status),
          })

        if (error) {
          console.error('Error saving Order:', error.message);
        } else {
        
          // insert sdate to database
        const startDate = new Date();
        const subscriptionStart = ref(startDate);
        const subscriptionEnd = ref('');
        const endDate = new Date(startDate);
        this.plan=='Mory Racing Lite'?endDate.setDate(endDate.getDate() + 1):endDate.setMonth(endDate.getMonth() + 1);
        subscriptionEnd.value = endDate;
        const { data, error } = await supabase
            .from('user_subscriptions')
            .insert({
              uid: (userdata.session.user.id),
              transaction_id: order.id?order.id:JSON.stringify(order.invoice.invoice_id),
                subscription_start: new Date(),
                subscription_end: endDate,
                status: 'Active',
            })
            if(error){
              console.log(error);
              
            }
          }
      } catch (error) {
        console.error('Error saving Order:', error.message);
      }

    },

    async fetchCartFromSupabase() {
      const supabase = useSupabaseClient();
      const user = useSupabaseUser();
      const { data, error } = await supabase.auth.getSession();
      const supabaseUserId = data.session.user.id;
      if (!user) {
        console.error('User not authenticated.');
        return;
      }
      try {
        const { data, error } = await supabase
          .from('users_cart')
          .select('cart_items')
          .eq('uid', supabaseUserId);

        if (error) {
          // console.error('Error fetching cart items:', error.message);
          return;
        }

        if (data && data.length > 0 && data[0].cart_items) {
          this.items = data[0].cart_items;
          
        } else {
          this.items = [];
        }
      } catch (error) {
        // console.error('Error fetching cart items:', error.message);
      }
    },

    setDiscountedPrice(discountedPrice) {
      this.discountedPrice = discountedPrice;
    },
    setCheckoutPrice(checkoutPrice) {
      this.checkoutPrice = checkoutPrice;
    },
    async captureOrder(orderData, planSelected) {
      this.orders = orderData
      this.plan=planSelected
      // console.log(this.plan);
      
      await this.saveOrder();
    }
  },
});
