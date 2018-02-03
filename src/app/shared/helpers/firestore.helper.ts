export const getEntityWithId = actions => actions.map(a => {
  const data = a.payload.doc.data();
  const id = a.payload.doc.id;
  return {id, ...data};
});
