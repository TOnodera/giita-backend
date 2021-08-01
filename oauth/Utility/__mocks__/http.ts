const mock = jest.fn().mockImplementation(() => {
   return {
      post: jest.fn(async () => {
         return {
            data: "post called..."
         };
      }),
      get: jest.fn(async () => {
         return {
            data: "get called..."
         };
      })
   };
});

export const mockCalucurator = jest.fn();
export { mock };
