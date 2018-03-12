const layers = [
  {
    id: 1,
    name: 'Layer 1',
    checked: false,
    markers: [
      {
        id: 100,
        position: [56.323, 43.995]
      }
    ]
  },
  {
    id: 2,
    name: 'Layer 2',
    checked: true,
    markers: [
      {
        id: 200,
        position: [56.313, 43.985]
      }
    ]
  },
]

export {layers};

export const fetchLayers = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(layers);
    }, 200); // a-la server responce
  })
}

export const fetchSave = async (model) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({res: model});
    }, 200); // a-la server responce
  })
}