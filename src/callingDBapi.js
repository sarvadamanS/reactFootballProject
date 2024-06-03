// const loginData = useSelector((state) => state?.userData?.isloggedIn);
// console.log(loginData);
// var data = JSON.stringify({
//   collection: "Sarva-Collection",
//   database: "Sarva-Database",
//   dataSource: "Cluster0",
//   projection: {
//     _id: 1,
//     nameF: 1,
//     club: 1,
//   },
// });

// var config = {
//   method: "post",
//   url: "https://ap-south-1.aws.data.mongodb-api.com/app/data-ovvgq/endpoint/data/v1/action/find",
//   headers: {
//     "Content-Type": "application/json",
//     "Access-Control-Request-Headers": "*",
//     "api-key":
//       "eFfsfXTlfnvMrpS2OsfWpAYZwdo1Lg69OJLERiE2EcUbtKPraCNryrX2EfON6cAH",
//     filter: {},
//   },
//   data: data,
// };

// axios(config)
//   .then(function (response) {
//     console.log(response);
//     console.log(data);
//     console.log(JSON.stringify(response.data));
//     setApiData(response.data.documents[0].club);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
