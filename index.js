const express = require("express");
const app = express();
const axios = require("axios");

app.set("json spaces", 2);

 // Separo los decimales
 const decimal = a => {
  let tempPrice = a.toString().split(".");
  if (isNaN(parseInt(tempPrice[1]))) {
    return 00;
  } else {
    return parseInt(tempPrice[1]);
  }
};


app.get("/api/items", (req, res) => {
  const item = req.query.q;
  const url = "https://api.mercadolibre.com/sites/MLA/search?q=" + item;
  const getItems = async (url) => {
    try {
      const response = await axios.get(url);
      const data = response.data;
      // Creo el objeto con la nueva respuesta
      let newResult = {
        author: {
          name: "Nicolas",
          lastName: "Unyicio",
        },
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
      data.results.forEach((item) => {
        //Creo el objeto price
        let price = {};
        // Recorro los precios
        item.prices.prices.forEach((value) => {
          price = {
            currency: value.currency_id,
            amount: value.amount,
            decimals: decimal(value.amount),
          };
        });
        // Creo un objeto para ir llenando la data final
        let tempItem = {
          id: item.id,
          title: item.title,
          price: price,
          picture: item.thumbnail,
          condition: item.condition,
          free_shipping: item.shipping.free_shipping,
        };
        newResult.items.push(tempItem);
      });
      res.json({ newResult });
    } catch (error) {
      console.log(error);
    }
  };
  getItems(url);
});

app.get("/api/items/:id", (req, res) => {

  const idItem = req.params.id;
  const item = "https://api.mercadolibre.com/items/" + idItem;
  const itemdes = "https://api.mercadolibre.com/items/" + idItem + "/description";

  const getItemAndDesc = async (a, b) => {
     try {
       const itemReq = await axios.get(a);
       const descriptionReq =  await axios.get(b);
       // Creo el objeto con la nueva respuesta
        let newResult = {
          author: {
            name: "Nicolas",
            lastName: "Unyicio",
          },
          item : {
            "id": itemReq.data.id,
            "title": itemReq.data.title,
            "price": {
              "currency": itemReq.data.currency_id,
              "amount": itemReq.data.price,
              "decimal":  decimal(itemReq.data.price)
            },
            "picture": itemReq.data.pictures[0].secure_url,
            "condition": itemReq.data.condition,
            "sold_quantity": itemReq.data.sold_quantity,
            "description": descriptionReq.data.plain_text
          }
        };

       res.json({ newResult });
     } catch (error) {
       console.log(error);
     }
   };
   getItemAndDesc(item, itemdes);

});

app.listen("8010", () => {
  console.log("Server in 8010");
});
