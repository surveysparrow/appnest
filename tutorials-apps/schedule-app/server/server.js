exports = {
  createSchedule: async function (args) {
    return createSchedule(args);
  },
  fetchSchedule: async function (args) {
    return fetchSchedule(args);
  },
  updateSchedule: async function (args) {
    return updateSchedule(args);
  },
  deleteSchedule: async function (args) {
    return deleteSchedule(args);
  },
  pauseSchedule: async function (args) {
    return pauseSchedule(args);
  },
  resumeSchedule: async function (args) {
    return resumeSchedule(args);
  },
  onScheduledEvent: async function (args) {
    return onScheduledEvent(args);
  },
};

const createSchedule = async (args) => {
  console.log('args', args);
  try {
    const data = await $Schedule.create({
      name: args.data.name,
      data: args.data.data,
      schedule_at: args.data.schedule_at
    });
    console.log(data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const fetchSchedule = async (args) => {
  console.log('args', args);
  try {
    const data = await $Schedule.fetch({
      name: args.data.name
    });
    console.log(data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateSchedule = async (args) => {
  console.log('args', args);
  try {
    const data = await $Schedule.update({
      name: args.data.name,
      data: args.data.data,
      schedule_at: args.data.schedule_at
    });
    console.log(data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteSchedule = async (args) => {
  console.log('args', args);
  try {
    const data = await $Schedule.delete({
      name: args.data.name
    });
    console.log(data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const pauseSchedule = async (args) => {
  console.log('args', args);
  try {
    const data = await $Schedule.pause({
      name: args.data.name
    });
    console.log(data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const resumeSchedule = async (args) => {
  console.log('args', args);
  try {
    const data = await $Schedule.resume({
      name: args.data.name
    });
    console.log(data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const onScheduledEvent = async (payload) => {
  console.log("at the scheduled time", payload);
};