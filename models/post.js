//Local Imports
const { pool } = require("../config/db");

const {
  redisGetFriends,
  redisGetExtendedFriends,
} = require("../utils/redis_utils");
const { uid } = require("../utils/uid");

//@audit Image has to be Optional
module.exports.createPost = function ({
  username: username,
  content: content,
  visibility: visibility,
  img_src: img_src,
}) {
  return new Promise(async function (resolve, reject) {
    let post_id = uid();
    pool.query(
      `INSERT INTO posts (post_id, content, visibility, username, img_src) VALUES (?,?,?,?,?)`,
      [post_id, content, visibility, username, img_src],
      function (error) {
        if (error) {
          return reject(error);
        }
        return resolve();
      }
    );
  });
};

module.exports.getAllPublicPosts = function () {
  return new Promise(async function (resolve, reject) {
    pool.query(
      `SELECT * FROM posts WHERE visibility=?`,
      ["0"],
      function (error, results) {
        if (error) {
          return reject(error);
        } else {
          return resolve(results);
        }
      }
    );
  });
};

module.exports.getAllFriendsPosts = function ({ username: username }) {
  return new Promise(async function (resolve, reject) {
    pool.query(
      `SELECT * from posts WHERE visibility=?`,
      ["1"],
      async function (error, results) {
        if (error) {
          return reject(error);
        } else {
          let rows = Object.values(JSON.parse(JSON.stringify(results)));
          let user_friends;
          try {
            user_friends = new Set(await redisGetFriends(username));
          } catch (error) {
            return reject(error);
          }
          friend_posts = rows.filter(function (row) {
            return user_friends.has(row.username);
          });
          return resolve(friend_posts);
        }
      }
    );
  });
};

module.exports.getAllExtendedFriendsPosts = function ({ username: username }) {
  return new Promise(async function (resolve, reject) {
    pool.query(
      `SELECT * from posts WHERE visibility=?`,
      ["2"],
      async function (error, results) {
        if (error) {
          return reject(error);
        } else {
          let rows = Object.values(JSON.parse(JSON.stringify(results)));
          let user_extended_friends;
          try {
            user_extended_friends = new Set(
              await redisGetExtendedFriends(username)
            );
          } catch (error) {
            return reject(error);
          }
          extended_friends_posts = rows.filter(function (row) {
            return user_extended_friends.has(row.username);
          });
          return resolve(extended_friends_posts);
        }
      }
    );
  });
};

module.exports.getSinglePublicPost = function ({ post_id: post_id }) {
  return new Promise(async function (resolve, reject) {
    pool.query(
      `SELECT * FROM posts WHERE post_id=? AND visibility=?`,
      [post_id, "0"],
      async function (error, results) {
        if (error) {
          return reject(error);
        } else if (results.length == 0) {
          return reject("No Post with such id exits");
        } else {
          return resolve(results[0]);
        }
      }
    );
  });
};

//Get single friends post => check if the user is authorized to see this post
module.exports.getSingleFriendsPost = function ({
  post_id: post_id,
  username: username,
}) {
  return new Promise(async function (resolve, reject) {
    pool.query(
      `SELECT * FROM posts WHERE post_id=? AND visibility=?`,
      [post_id, "1"],
      async function (error, results) {
        if (error) {
          return reject(error);
        } else if (results.length == 0) {
          return reject("Post with such id doesnot exits");
        } else {
          let rows = Object.values(JSON.parse(JSON.stringify(results)));
          let user_friends;
          try {
            user_friends = new Set(await redisGetFriends(username));
          } catch (error) {
            return reject(error);
          }
          friends_post = rows.filter(function (row) {
            return user_friends.has(row.username);
          });
          if (friends_post.length == 0) {
            return reject("Not Authorized");
          }
          return resolve(friends_post);
        }
      }
    );
  });
};

module.exports.getSingleExtendedFriendsPost = function ({
  post_id: post_id,
  username: username,
}) {
  return new Promise(async function (resolve, reject) {
    pool.query(
      `SELECT * FROM posts WHERE post_id=? AND visibility=?`,
      [post_id, "2"],
      async function (error, results) {
        if (error) {
          return reject(error);
        } else if (results.length == 0) {
          return reject("Post with such id doesnot exits");
        } else {
          let rows = Object.values(JSON.parse(JSON.stringify(results)));
          let user_extended_friends;
          try {
            user_extended_friends = new Set(
              await redisGetExtendedFriends(username)
            );
          } catch (error) {
            return reject(error);
          }
          extended_friends_post = rows.filter(function (row) {
            return user_extended_friends.has(row.username);
          });

          if (extended_friends_post.length == 0) {
            return reject("Not Authorized");
          }

          return resolve(extended_friends_post);
        }
      }
    );
  });
};

module.exports.createPostWithTags = function ({
  username: username,
  content: content,
  visibility: visibility,
  tags: tags,
}) {
  return new Promise(async function (resolve, reject) {
    let post_id = uid();
    pool.getConnection(function (error, connection) {
      if (error) {
        return reject(error);
      }
      connection.beginTransaction(function (error) {
        if (error) {
          return reject(error);
        }
        connection.query(
          `INSERT INTO posts (post_id, content, visibility, username) VALUES (?,?,?,?)`,
          [post_id, contnet, visibility, username],
          function (error, results) {
            if (error) {
              reject(error);
              connection.rollback(function (error) {
                connection.release();
              });
              return;
            }
            tags = tags || [];
          }
        );
      });
    });
  });
};

// const {
//   pool,
//   logger,
//   queryDB,
//   getConnectionAndTransaction,
//   commitTransaction,
//   rollbackTransaction,
// } = require("../../db");
// /**
//  *
//  * @param {String} name
//  * @param {String} category
//  * @param {Array<String>} tags
//  * @param {String} description
//  * @param {String} details
//  * @param {String} varieties
//  * @param {Number} userId
//  * @param {Number} price
//  * @param {Number} stock
//  * @param {Number} discount
//  * @param {String} code
//  * @param {Array} images
//  * @param {Number} toBeShown
//  * @param {String} barCode
//  * @param {String?} additionalField
//  * @param {Number} originalUserId
//  * @param {Number} chazeShare
//  * @param {String} weight
//  * @return {Promise} to add product to database
//  */
// function addProduct(
//   name,
//   category,
//   tags,
//   description,
//   details,
//   varieties,
//   userId,
//   price,
//   stock,
//   discount = 0,
//   code,
//   images,
//   toBeShown,
//   barCode,
//   additionalField = null,
//   originalUserId = null,
//   chazeShare = null,
//   weight = null
// ) {
//   userId = Number(userId);
//   if (isNaN(userId)) {
//     return Promise.reject("Invalid Authentication");
//   }
//   return new Promise(async (resolve, reject) => {
//     pool.getConnection(function (error, connection) {
//       if (error) {
//         reject(error);
//       }
//       connection.beginTransaction(function (error) {
//         if (error) {
//           return reject(error);
//         }
//         connection.query(
//           "INSERT INTO products" +
//             "(`name`,`category`,`description`,`details`,`varieties`," +
//             "`seller_id`,`price`,`stock`,`discount`,`code`,`to_be_shown`,`bar_code`,additional_field,changed_by,chaze_share,weight)" +
//             " VALUES (?,?,?,?,?" +
//             "," +
//             "(SELECT merchant FROM users WHERE id=" +
//             "?)" +
//             ",?,?,?" +
//             ",?,?,?,?,?,?,?)",
//           [
//             name,
//             category,
//             description,
//             details,
//             varieties,
//             userId,
//             price,
//             stock,
//             discount,
//             code,
//             0,
//             barCode,
//             additionalField,
//             originalUserId,
//             chazeShare,
//             weight,
//           ],
//           (error, results, fields) => {
//             if (error) {
//               if (error.code === "ER_DUP_ENTRY") {
//                 reject(
//                   "You have specified duplicate entry, please try again. Note that code must be unique."
//                 );
//               } else reject(error);
//               connection.rollback(function (error) {
//                 connection.release();
//               });
//               return;
//             }
//             tags = tags || [];
//             tags = Array.from(new Set(tags.map((e) => e.trim())));
//             let idProduct = results.insertId;
//             let error1 = false;
//             tags.forEach(async (tag) => {
//               tag = tag.trim();
//               let xy = new Promise(function (resolve, reject) {
//                 connection.query(
//                   "INSERT INTO tag(`name`)" +
//                     "VALUES(?) ON duplicate key update name=name",
//                   [tag],
//                   (error, results, fields) => {
//                     if (error) {
//                       reject(error);
//                       return;
//                     }
//                     connection.query(
//                       "INSERT INTO tagmap(`product_id`," +
//                         "`tag_id`) VALUES(?,(SELECT `id` FROM tag WHERE `name`=?)) ON duplicate key update tag_id=tag_id",
//                       [idProduct, tag],
//                       (error, results, fields) => {
//                         if (error) {
//                           reject(error);
//                           return;
//                         }
//                         resolve("Successfully inserted");
//                       }
//                     );
//                   }
//                 );
//               });
//               try {
//                 await xy;
//               } catch (e) {
//                 connection.rollback(function (error) {
//                   connection.release();
//                   reject(e);
//                 });
//                 error1 = true;
//               }
//             });
//             if (error1) {
//               return;
//             }
//             connection.commit(function (error) {
//               connection.release();
//               if (error) {
//                 reject(error);
//                 return;
//               }
//               queryDB(
//                 pool,
//                 `
//               INSERT INTO product_images (id,image_id,\`index\`,url)
//                     SELECT NULL,id,1,'https://chazes3.s3.ap-south-1.amazonaws.com/default_images/default_bag.jpg' FROM products WHERE id NOT IN (SELECT image_id FROM product_images WHERE \`index\`=1);`
//               );
//               const { getAllDetailsProduct } = require("./getProducts");
//               getAllDetailsProduct({ product_id: idProduct }).then((data) => {
//                 resolve(data[0] && data[0].products ? data[0].products[0] : {});
//                 logger({
//                   table: "product_changes",
//                   data: [
//                     idProduct,
//                     "",
//                     JSON.stringify(data[0].products[0]),
//                     originalUserId,
//                   ],
//                 });
//               });
//               const {
//                 addProductToElasticSearch,
//               } = require("../../elasticsearch/addProduct");
//               addProductToElasticSearch({ id: [idProduct] }).catch(
//                 console.error
//               );
//             });
//           }
//         );
//       });
//     });
//   });
// }

// /**
//  *
//  * @param {Object} param0
//  * @param {Number} param0.id
//  * @param {Number} param0.seller_id
//  * @param {Number} param0.product_id
//  * @param {Number} param0.index
//  * @return {Promise}
//  */
// function setTopProduct({
//   id,
//   seller_id: sellerId,
//   product_id: productId,
//   index,
// }) {
//   return queryDB(
//     pool,
//     `INSERT INTO top_products_shop (id,seller_id,product_id,index)
//   SELECT NULL AS id, ? AS seller_id, ? AS product_id, ? AS index FROM users WHERE id=?
//   AND (merchant=? OR (SELECT admin FROM management_info WHERE user_id=?))
//   AND (SELECT seller_id FROM products WHERE id=?)=?
//   ON DUPLICATE KEY UPDATE index=VALUES(index)
//   `,
//     [sellerId, productId, index, id, sellerId, id, productId, sellerId]
//   ).then((results) =>
//     results.affectedRows === 1
//       ? Promise.resolve("Successfull")
//       : Promise.reject(
//           "Sorry, not processed, are you authorized to set top products?"
//         )
//   );
// }

// /**
//  *
//  * @param {Object} param0
//  * @param {Number} param0.id
//  * @param {Array<{category:number,seller_id:number,description:string,name:string,details:string,price:number,stock:number,discount:number,additional_field:string,chazeShare:number,to_be_shown:number,weight:string}>} param0.data
//  * @return {Promise}
//  */
// function addBulkProducts({ data }) {
//   const defaultDetails = "[]";
//   const defaultDescription = "";
//   const defaultChazeShare = null;
//   let query = `INSERT INTO products (name,category,description,details,varieties,seller_id,price,stock,discount,code,chaze_share,to_be_shown,weight,additional_field) VALUES `;
//   const params = [];
//   console.log(data);
//   return queryDB(pool, `SELECT MAX(id) as number FROM products`)
//     .then((results) => {
//       let num = results[0].number;
//       data.forEach((product) => {
//         query += `(?,?,?,?,?,?,?,?,?,?,?,?,?,?),`;

//         params.push(
//           product.name,
//           product.category,
//           product.description ? product.description : defaultDescription,
//           product.details ? product.details : defaultDetails,
//           "",
//           product.seller_id,
//           product.price,
//           product.stock,
//           product.discount ? product.discount : 0,
//           String(product.seller_id) + "_" + String(++num),
//           product.chazeShare ? product.chazeShare : defaultChazeShare,
//           product.to_be_shown,
//           product.weight,
//           product.additional_field
//         );
//       });
//       return queryDB(pool, query.substr(0, query.length - 1), params);
//     })
//     .then((results) => {
//       queryDB(
//         pool,
//         `
//       INSERT INTO product_images (id,image_id,\`index\`,url)
//             SELECT NULL,id,1,'https://chazes3.s3.ap-south-1.amazonaws.com/default_images/default_bag.jpg' FROM products WHERE id NOT IN (SELECT image_id FROM product_images WHERE \`index\`=1);`
//       );
//       return results;
//     })
//     .then((results) =>
//       results.affectedRows >= 1 ? "Success" : Promise.reject("No row added")
//     );
// }

// /**
//  *
//  * @param {Object} param0
//  * @param {Number} param0.product_id
//  * @param {Number} param0.to_shop
//  * @return {Promise}
//  */
// function copyProductToShop({ product_id: productId, to_shop: toShop }) {
//   let newId;
//   return getConnectionAndTransaction(pool).then((connection) =>
//     queryDB(
//       connection,
//       `SELECT NULL,name,category,description,details,varieties,? as seller_id,price,stock,discount, concat(
//       substring('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', rand(@seed:=round(rand(NOW())*4294967296))*36+1, 1),
//       substring('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', rand(@seed:=round(rand(@seed)*4294967296))*36+1, 1),
//       substring('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', rand(@seed:=round(rand(@seed)*4294967296))*36+1, 1),
//       substring('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', rand(@seed:=round(rand(@seed)*4294967296))*36+1, 1),
//       substring('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', rand(@seed:=round(rand(@seed)*4294967296))*36+1, 1),
//       substring('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', rand(@seed:=round(rand(@seed)*4294967296))*36+1, 1),
//       substring('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', rand(@seed:=round(rand(@seed)*4294967296))*36+1, 1),
//       substring('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', rand(@seed)*36+1, 1)
//      ) as code FROM products WHERE id=? `,
//       [toShop, productId]
//     )
//       .then((results) => {
//         let query = `INSERT INTO products (id,name,category,description,details,varieties,seller_id,price,stock,discount,code,
//         image_first,image_second,image_third,deleted,to_be_shown,bar_code, visits) VALUES `;
//         let params = [];
//         results.forEach((value) => {
//           query += "(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?),";
//           params.push(
//             null,
//             value.name,
//             value.category,
//             value.description,
//             value.details,
//             value.varieties,
//             value.seller_id,
//             value.price,
//             value.stock,
//             value.discount,
//             value.code,
//             null,
//             null,
//             null,
//             0,
//             0,
//             null,
//             0
//           );
//         });
//         query = query.substr(0, query.length - 1);
//         return { query, params };
//       })
//       .then(({ query, params }) => queryDB(connection, query, params))
//       .then((results) => (newId = results.insertId))
//       .then((results) =>
//         queryDB(
//           connection,
//           `SELECT NULL, ? as id ,pi.\`index\`,pi.url FROM product_images pi WHERE
//      pi.image_id=?`,
//           [newId, productId]
//         )
//       )
//       .then((results) => {
//         let query = `INSERT INTO product_images VALUES `;
//         let params = [];
//         results.forEach((value) => {
//           query += `(?,?,?,?),`;
//           params.push(null, value.id, value.index, value.url);
//         });
//         query = query.substr(0, query.length - 1);
//         return { query, params };
//       })
//       .then(({ query, params }) => queryDB(connection, query, params))
//       .then(() =>
//         queryDB(
//           connection,
//           `SELECT NULL, ? as id, tm.tag_id FROM tagmap tm WHERE tm.product_id=?`,
//           [newId, productId]
//         )
//       )
//       .then((results) => {
//         let query = `INSERT INTO tagmap VALUES`;
//         let params = [];
//         results.forEach((value) => {
//           query += `(?,?,?),`;
//           params.push(null, value.id, value.tag_id);
//         });
//         query = query.substr(0, query.length - 1);
//         return { query, params };
//       })
//       .then(({ query, params }) =>
//         params.length >= 1 ? queryDB(connection, query, params) : "Succcess"
//       )
//       .then((results) => "SuccessFully Copied")
//       .then((data) => commitTransaction(connection, data))
//       .catch((error) => rollbackTransaction(connection, error))
//   );
// }
// module.exports = {
//   addProduct,
//   setTopProduct,
//   addBulkProducts,
//   copyProductToShop,
// };
