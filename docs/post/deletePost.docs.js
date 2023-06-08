module.exports = {
  delete: {
    tags: ["Post"],
    summary: "delete post",
    parameters: [
      {
        name: "postId",
        in: "path",
        required: true,
        description: "id of post that we want to delete",
        type: "interger",
      },
    ],
    responses: {
      200: {
        description: "Successful Response",
        content: {
          "application/json": {
            schema: {
              type: "object",
              example: {
                message: "post deleted successfully",
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
                error: "posts with this id not found!",
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
