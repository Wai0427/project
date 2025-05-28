const totalOrder = document.querySelector('.totalCost');
            const userOrderCost = document.querySelector('.userOrder');
            let totalCost ='';

            function enterCalculation(event) {
                if (event.key === 'Enter'){
                    totalCostOfOrder();
                    
                    return event.key !== '-' && event.key !== 'e'
                }

            }

            function totalCostOfOrder() {
                let userGrossCost = parseFloat(userOrderCost.value);
                // Or can use 
                // let userGrossCost = Number(userOrderCost.value);

                if (userGrossCost >= 40) {
                    totalCost = userGrossCost + 10;
                } else {
                    totalCost = userGrossCost;
                };

                if (!totalCost || totalCost <= 0) {
                    totalOrder.innerHTML = 'Please fill in your orders\' cost ';
                } else {
                    totalOrder.innerHTML = 'Your Total Cost = $' + totalCost;
                }
            } 

            function subscribeYT() {
                const ytButton = document.body.querySelector('.yt-btn');

                console.log(ytButton.innerText);
                
                if (ytButton.innerText === 'Subscribe') {
                    ytButton.innerText = 'Subscribed!';
                } else {
                    ytButton.innerText = 'Subscribe';
                }
            }

            