export const broadcastSchema = {
  type: "object",

  properties: {
    title: {
      type: "string",
    },

    type: {
      type: "string",
    },

    level: {
      type: "string",
    },

    content: {
      type: "array",

      items: {
        type: "object",

        properties: {
          section: {
            type: "string",
          },

          content: {
            type: "string",
          },
        },

        required: [
          "section",
          "content",
        ],
      },
    },
  },

  required: [
    "title",
    "type",
    "level",
    "content",
  ],
};

export const reportSchema = {
  type: "object",

  properties: {
    schoolName: {
      type: "string",
    },

    region: {
      type: "string",
    },

    reportTitle: {
      type: "string",
    },

    implementer: {
      type: "string",
    },

    location: {
      type: "string",
    },

    target: {
      type: "string",
    },

    beneficiaries: {
      type: "string",
    },

    date: {
      type: "string",
    },

    objectives: {
      type: "string",
    },
  },

  required: [
    "schoolName",
    "region",
    "reportTitle",
    "implementer",
    "location",
    "target",
    "beneficiaries",
    "date",
    "objectives",
  ],
};
