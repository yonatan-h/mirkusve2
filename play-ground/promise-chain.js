// new Promise((s, f) => {
// 	throw new Error("im an error");
// })
// 	.catch((e) => {
// 		console.log("eroro happend");
// 		return 5;
// 	})
// 	.then(
// 		(x) =>
// 			new Promise((s, f) => {
// 				console.log("life continues" + x);
// 			})
// 	);

// new Promise((s, f) => {
// 	throw new Error("im an error");
// })
// 	.then(
// 		(x) =>
// 			new Promise((s, f) => {
// 				console.log("life continues" + x);
// 			}),

// 		(e) => {
// 			console.log("eroro happend");
// 			return 5;
// 		}
// 	)
// 	.then(() => console.log("erry thing is done"));
