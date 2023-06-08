module.exports = {
  get: {
    tags: ["Post"],
    summary: "fetch post by id",
    parameters: [
      {
        name: "postId",
        in: "path",
        required: true,
        description: "id of post that we want to find",
        type: "string",
      },
    ],
    responses: {
      200: {
        description: "Successful response",
        content: {
          "application/json": {
            schema: {
              type: "object",
              example: {
                data: {
                  _id: "64816bf4790bfe36a04ad341",
                  caption: "this is new post!",
                  location: "nadiad",
                  tags: ["ddu", "nadiad", "collegeroad"],
                  postedBy: "643f92e8307bfa28ce132c62",
                  comments: [],
                  createdAt: "2023-06-08T05:49:40.980Z",
                  updatedAt: "2023-06-08T05:49:40.980Z",
                  __v: 0,
                },
              },
            },
          },
        },
      },
      404: {
        description: "Not found",
        content: {
          "application/json": {
            schema: {
              type: "object",
              example: {
                error: "post with this id not found!",
              },
            },
          },
        },
      },
      500: {
        description: "Internal Server Error",
        content: {
          "application/json": {
            schema: {
              type: "object",
              example: {
                message: "Invalid signature",
              },
            },
          },
        },
      },
    },
  },
};
