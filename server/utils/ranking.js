const reciprocalRankFusion = (rankedList1, rankedList2) => {
  //creating a map
  let documents = new Map();

  //adding entries to map {document_id->{
  //                             product: rankedList1[i],
  //                             score: 1/rank
  //                             }}
  for (let i = 0; i < rankedList1.length; i++) {
    const document_id = rankedList1[i]._id.toString();
    const rank = i + 1; //Ranks start from 1

    if (!documents.has(document_id)) {
      documents.set(document_id, {
        product: rankedList1[i],
        score: 0,
      });
    }
    //Stores same object reference
    const docInfo = documents.get(document_id);
    docInfo.score += 1 / rank;
  }

  //adding entries to map {document_id->{
  //                             product: rankedList1[i],
  //                             score: 1/rank
  //                             }}
  for (let i = 0; i < rankedList2.length; i++) {
    const document_id = rankedList2[i]._id.toString();
    const rank = i + 1; //Ranks start from 1

    if (!documents.has(document_id)) {
      documents.set(document_id, {
        product: rankedList2[i],
        score: 0,
      });
    }
    //Stores same object reference
    const docInfo = documents.get(document_id);
    docInfo.score += 1 / rank;
  }

  //Sorting the documents
  const sortedDocuments = Array.from(documents).sort(
    (a, b) => b[1].score - a[1].score
  );

  //returning sorted list with id and product
  return sortedDocuments.map((document, idx) => ({
    _id: document[0],
    product: document[1],
  }));
};

//Applying mean filtering to the products
const meanFilter = (products) => {
  const mean =
    products.reduce((acc, product) => acc + product.product.score, 0) /
    products.length;
  const filteredProducts = products.filter(
    (product) => product.product.score > mean
  );
  return filteredProducts;
};

module.exports = {
  reciprocalRankFusion,
  meanFilter,
};
