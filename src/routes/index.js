const { Router } = require("express");
const axios = require("axios");
const router = Router();
const author =  {
  name: "Nicolas",
  lastName: "Unyicio",
};

// Separo los decimales
const decimal = (a) => {
  let tempPrice = a.toString().split(".");
  if (isNaN(parseInt(tempPrice[1]))) {
    return 00;
  } else {
    return parseInt(tempPrice[1]);
  }
};

router.get("/api/items", (req, res) => {
  const item = req.query.q;
  const url = "https://api.mercadolibre.com/sites/MLA/search?q=" + item;
  const getItems = async (url) => {
    try {
      const response = await axios.get(url);
      const data = response.data;
      // Creo el objeto con la nueva respuesta
      let newResult = {
        author,
        categories: [],
        items: [],
      };
      // Recorro los filtros para las categorias
      data.filters.forEach((filter) => {
        filter.values.forEach((value) => {
          if (value.path_from_root) {
            value.path_from_root.forEach((path) => {
              newResult.categories.push(path.name);
            });
          }
        });
      });
      // Recorro los resultados para generar los items
      if (data.results !== undefined){
        data.results.forEach((item) => {
          //Creo el objeto price
          let price = {};
          // Recorro los precios
          if(item.prices.prices !== undefined){
            item.prices.prices.forEach((value) => {
              price = {
                currency: value.currency_id,
                amount: item.price,
                decimals: decimal(item.price),
              };
            });
          }
          // Creo un objeto para ir llenando la data final
          let tempItem = {
            id: item.id,
            title: item.title,
            price: price,
            picture: item.thumbnail,
            condition: item.condition,
            free_shipping: item.shipping.free_shipping,
            adress: item.address.state_name
          };
          newResult.items.push(tempItem);
        });
      }
      
      res.json(newResult);
    } catch (error) {
      console.log(error);
    }
  };
  getItems(url);
});

router.get("/api/items/:id", (req, res) => {
  const idItem = req.params.id;
  const item = "https://api.mercadolibre.com/items/" + idItem;
  const itemdes = "https://api.mercadolibre.com/items/" + idItem + "/description";

  const getItemAndDesc = async (a, b) => {
    try {
      const itemReq = await axios.get(a);
      const descriptionReq = await axios.get(b);
      // Creo el objeto con la nueva respuesta
      let newResult = {
        author,
        item: {
          id: itemReq.data.id,
          title: itemReq.data.title,
          price: {
            currency: itemReq.data.currency_id,
            amount: itemReq.data.price,
            decimal: decimal(itemReq.data.price),
          },
          picture: itemReq.data.pictures[0].secure_url,
          condition: itemReq.data.condition,
          sold_quantity: itemReq.data.sold_quantity,
          description: descriptionReq.data.plain_text,
        },
      };

      res.json(newResult);
    } catch (error) {
      console.log(error);
    }
  };
  getItemAndDesc(item, itemdes);
});

module.exports = router;
