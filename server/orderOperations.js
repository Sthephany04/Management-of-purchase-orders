const shippingMethods = require('./shippingMethods');

let orders = [];

const getAllOrders = () => orders;

const getOrder = (id_order) => {
  const id = id_order;
  const order = orders.filter(item => item.external_order_number === id);
  return order;
};

const createOrder = (body_order) => { 

  let dateNow = new Date();  
  let create_date = dateNow.toLocaleDateString().split('/');

  let date = create_date[2] + '-' 
    + (parseInt(create_date[0]) > 9 ? create_date[0] : '0' + create_date[0]) 
    + '-' + (parseInt(create_date[1]) > 9 ? create_date[1] : '0' + create_date[1]);

  shippingMethods.getMethodDetails(body_order.shipping_method)
    .then(data => shippingMethods.getOffDays()
    .then(days => {
      let day_bussiness = days.find((day) => day === date) !== date;
      const arrayDays = getArrayDays(date, days);

      let weight =  0;
      let promise = {
        pack_promise_min: null,
        pack_promise_max: null,
        ship_promise_min: null,
        ship_promise_max: null,
        delivery_promise_min: null,
        delivery_promise_max: null,
        ready_pickup_promise_min: null,
        ready_pickup_promise_max: null
      };

      body_order.line_items.forEach(value => weight += parseInt(value.weightProduct));

      if(parseInt(data.rules.availability.byWeight.min) <= weight 
            && weight <= parseInt(data.rules.availability.byWeight.max)) {
        if(data.rules.availability.byRequestTime.dayType === 'ANY'
              || (data.rules.availability.byRequestTime.dayType === 'BUSINESS' && day_bussiness)) {
          if(parseInt(data.rules.availability.byRequestTime.fromTimeOfDay) <= dateNow.getHours() 
            && dateNow.getHours() <= parseInt(data.rules.availability.byRequestTime.toTimeOfDay) ) {
              let cases = data.rules.promisesParameters.cases;
              let priority = 1;
              let caseWork = undefined;
              let state = true;
              while(state){
                let casePromise = cases.find(value => value.priority === priority);
                if(casePromise !== undefined) {
                  if(casePromise.condition.byRequestTime.dayType === 'ANY'
                      || (casePromise.condition.byRequestTime.dayType === 'BUSINESS' && day_bussiness)) {
                    if(parseInt(casePromise.condition.byRequestTime.fromTimeOfDay) <= dateNow.getHours() 
                      && dateNow.getHours() <= parseInt(casePromise.condition.byRequestTime.toTimeOfDay) ) {
                        caseWork = casePromise;
                        state = false;
                    } else {
                      priority++;  
                    }
                  } else {
                    priority++; 
                  }
                } else {
                  state = false;
                }
              }
              if (caseWork !== undefined) {
                let datePromise;
                
                /*pack promise*/
                let minType_packPromise = caseWork.packPromise.min.type;
                let maxType_packPromise = caseWork.packPromise.max.type;
                switch(minType_packPromise){
                  case "NULL":
                    promise.pack_promise_min = null;
                    break;
                  case "DELTA-HOURS":
                    datePromise = new Date();
                    datePromise.setHours(datePromise.getHours() + caseWork.packPromise.min.deltaHours);
                    promise.pack_promise_min = datePromise.toUTCString();
                    break;
                  case "DELTA-BUSINESSDAYS":
                    let posPackMin = (caseWork.packPromise.min.deltaBusinessDays - 1) < 0
                      ? 9 :caseWork.packPromise.min.deltaBusinessDays - 1
                    datePromise = new Date(arrayDays[posPackMin]);
                    datePromise.setDate(datePromise.getDate() + 1)
                    datePromise.setHours(caseWork.packPromise.min.timeOfDay);
                    promise.pack_promise_min = datePromise.toUTCString();
                    break;
                  default:
                    promise.pack_promise_min = null;
                    break; 
                }
                switch(maxType_packPromise){
                  case "NULL":
                    promise.pack_promise_max = null;
                    break;
                  case "DELTA-HOURS":
                    datePromise = new Date();
                    datePromise.setHours(datePromise.getHours() + caseWork.packPromise.max.deltaHours);
                    promise.pack_promise_max = datePromise.toUTCString();
                    break;
                  case "DELTA-BUSINESSDAYS":
                    let posPackMax = (caseWork.packPromise.max.deltaBusinessDays - 1) < 0
                      ? 9 :caseWork.packPromise.max.deltaBusinessDays - 1
                    datePromise = new Date(arrayDays[posPackMax]);
                    datePromise.setDate(datePromise.getDate() + 1)
                    datePromise.setHours(caseWork.packPromise.max.timeOfDay);
                    promise.pack_promise_max = datePromise.toUTCString();
                    break;
                  default:
                    promise.pack_promise_max = null;
                    break; 
                }

                /*ship promise*/
                let minType_shipPromise = caseWork.shipPromise.min.type;
                let maxType_shipPromise = caseWork.shipPromise.max.type;
                switch(minType_shipPromise){
                  case "NULL":
                    promise.ship_promise_min = null;
                    break;
                  case "DELTA-HOURS":
                    datePromise = new Date();
                    datePromise.setHours(datePromise.getHours() + caseWork.shipPromise.min.deltaHours);
                    promise.ship_promise_min = datePromise.toUTCString();
                    break;
                  case "DELTA-BUSINESSDAYS":
                    let posShipMin = (caseWork.shipPromise.min.deltaBusinessDays - 1) < 0
                      ? 9 :caseWork.shipPromise.min.deltaBusinessDays - 1
                    datePromise = new Date(arrayDays[posShipMin ]);
                    datePromise.setDate(datePromise.getDate() + 1);
                    datePromise.setHours(caseWork.shipPromise.min.timeOfDay);
                    promise.ship_promise_min = datePromise.toUTCString();
                    break;
                  default:
                    promise.ship_promise_min = null;
                    break; 
                }
                switch(maxType_shipPromise){
                  case "NULL":
                    promise.ship_promise_max = null;
                    break;
                  case "DELTA-HOURS":
                    datePromise = new Date();
                    datePromise.setHours(datePromise.getHours() + caseWork.shipPromise.max.deltaHours);
                    promise.ship_promise_max = datePromise.toUTCString();
                    break;
                  case "DELTA-BUSINESSDAYS":
                    let posShipMax = (caseWork.shipPromise.max.deltaBusinessDays - 1) < 0
                      ? 9 :caseWork.shipPromise.max.deltaBusinessDays - 1
                    datePromise = new Date(arrayDays[posShipMax]);
                    datePromise.setDate(datePromise.getDate() + 1);
                    datePromise.setHours(caseWork.shipPromise.max.timeOfDay);
                    promise.ship_promise_max = datePromise.toUTCString();
                    break;
                  default:
                    promise.ship_promise_max = null;
                    break; 
                }

                /*delivery promise*/
                let minType_deliveryPromise = caseWork.deliveryPromise.min.type;
                let maxType_deliveryPromise = caseWork.deliveryPromise.max.type;
                switch(minType_deliveryPromise){
                  case "NULL":
                    promise.delivery_promise_min = null;
                    break;
                  case "DELTA-HOURS":
                    datePromise = new Date();
                    datePromise.setHours(datePromise.getHours() + caseWork.deliveryPromise.min.deltaHours);
                    promise.delivery_promise_min = datePromise.toUTCString();
                    break;
                  case "DELTA-BUSINESSDAYS":
                    let posDeliveryMin = (caseWork.deliveryPromise.min.deltaBusinessDays - 1) < 0
                      ? 9 :caseWork.deliveryPromise.min.deltaBusinessDays - 1
                    datePromise = new Date(arrayDays[posDeliveryMin]);
                    datePromise.setDate(datePromise.getDate() + 1);
                    datePromise.setHours(caseWork.deliveryPromise.min.timeOfDay);
                    promise.delivery_promise_min = datePromise.toUTCString();
                    break;
                  default:
                    promise.delivery_promise_min = null;
                    break; 
                }
                switch(maxType_deliveryPromise){
                  case "NULL":
                    promise.delivery_promise_max = null;
                    break;
                  case "DELTA-HOURS":
                    datePromise = new Date();
                    datePromise.setHours(datePromise.getHours() + caseWork.deliveryPromise.max.deltaHours);
                    promise.delivery_promise_max= datePromise.toUTCString();
                    break;
                  case "DELTA-BUSINESSDAYS":
                    let posDeliveryMax = (caseWork.deliveryPromise.max.deltaBusinessDays - 1) < 0
                      ? 9 :caseWork.deliveryPromise.max.deltaBusinessDays - 1
                    datePromise = new Date(arrayDays[posDeliveryMax]);
                    datePromise.setDate(datePromise.getDate() + 1);
                    datePromise.setHours(caseWork.deliveryPromise.max.timeOfDay);
                    promise.delivery_promise_max = datePromise.toUTCString();
                    break;
                  default:
                    promise.delivery_promise_max = null;
                    break; 
                }

                /*ready pickup promise*/
                let minType_readyPickUpPromise = caseWork.readyPickUpPromise.min.type;
                let maxType_readyPickUpPromise = caseWork.readyPickUpPromise.max.type;
                switch(minType_readyPickUpPromise){
                  case "NULL":
                    promise.ready_pickup_promise_min = null;
                    break;
                  case "DELTA-HOURS":
                    datePromise = new Date();
                    datePromise.setHours(datePromise.getHours() + caseWork.readyPickUpPromise.min.deltaHours);
                    promise.ready_pickup_promise_min = datePromise.toUTCString();
                    break;
                  case "DELTA-BUSINESSDAYS":
                    let posReadyPickUpMin = (caseWork.readyPickUpPromise.min.deltaBusinessDays - 1) < 0
                      ? 9 :caseWork.readyPickUpPromise.min.deltaBusinessDays - 1
                    datePromise = new Date(arrayDays[posReadyPickUpMin]);
                    datePromise.setDate(datePromise.getDate() + 1);
                    datePromise.setHours(caseWork.readyPickUpPromise.min.timeOfDay);
                    promise.ready_pickup_promise_min = datePromise.toUTCString();
                    break;
                  default:
                    promise.ready_pickup_promise_min = null;
                    break; 
                }
                switch(maxType_readyPickUpPromise){
                  case "NULL":
                    promise.ready_pickup_promise_max = null;
                    break;
                  case "DELTA-HOURS":
                    datePromise = new Date();
                    datePromise.setHours(datePromise.getHours() + caseWork.readyPickUpPromise.max.deltaHours);
                    promise.ready_pickup_promise_max= datePromise.toUTCString();
                    break;
                  case "DELTA-BUSINESSDAYS":
                    let posReadyPickUpMax = (caseWork.readyPickUpPromise.max.deltaBusinessDays - 1) < 0
                      ? 9 :caseWork.readyPickUpPromise.max.deltaBusinessDays - 1
                    datePromise = new Date(arrayDays[posReadyPickUpMax]);
                    datePromise.setDate(datePromise.getDate() + 1);
                    datePromise.setHours(caseWork.readyPickUpPromise.max.timeOfDay);
                    promise.ready_pickup_promise_max = datePromise.toUTCString();
                    break;
                  default:
                    promise.ready_pickup_promise_max = null;
                    break; 
                }
              }
          }     
        }      
      }

      const order = {
          ...body_order,
          ...promise,
          shipping_method_name: data.name, 
          creation_date: date,
          internal_order_number: Math.round(Date.now() / 1000).toString() + '-' + Math.round(Math.random()*100).toString()
        }  
        
        orders = [...orders, order];
      }))  
};

const getArrayDays = (date, offsDays) => {
  
  let dateNow = new Date(date);
  dateNow.setDate(dateNow.getDate() + 1);
  let arrayDates = [];
  let count = 1;
  for (let i = 0; i < 10; i++) {
    let searchDate = true;
    while(searchDate && count < 100) {    
      dateNow.setDate(dateNow.getDate() + 1)
      let nextDay = dateNow.toLocaleDateString().split('/');
      nextDay = nextDay[2] + '-' 
        + (parseInt(nextDay[0]) > 9 ? nextDay[0] : '0' + nextDay[0]) 
        + '-' + (parseInt(nextDay[1]) > 9 ? nextDay[1] : '0' + nextDay[1]);
      let day_bussiness = offsDays.find((day) => day === nextDay) !== nextDay;
      if (day_bussiness) {
        arrayDates.push(nextDay);
        searchDate = false;
      }
      count++;
    }
  }
  return arrayDates;
}

module.exports = {
  getAllOrders,
  getOrder,
  createOrder
};