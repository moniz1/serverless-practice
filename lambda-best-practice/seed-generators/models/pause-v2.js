module.exports = {
  type: 'object',
  properties: {
    thingId: {
      type: 'integer',
      minimum: 1,
      autoIncrement: true
    },
    deviceType: {
      enum: ["RLM6","VD1"]
    },
    duration: {
      enum: [60, 120, 90]
    },
    status: {
      enum: ["pending", "active", "inactive"]
    }
  }
}