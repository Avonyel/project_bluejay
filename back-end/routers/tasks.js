const router = require("express").Router();
const { Task } = require("../models");
const { createResponse } = require("../server/util");
const { getResource, logEvent, logError } = require('../server/middleware');
const { TaskEvent, MessageEvent, Messages } = require('../models/events');

// creating a task
router.post("/", async (req, res) => {
  try {
    const { title, description, rewards, teacher, class, status } = req.body;
    if (!title || !description) {
      throw new Error('No title or description supplied.');
    }
    const task = new Task({ title, description, rewards, teacher, class, status });

    // Create log event.
    logEvent(TaskEvent, {
      message: Messages.TEMPLATE_TASK_CREATE,
      owner: req.user,
      task
    }, false);

    await task.save();
    res.json(createResponse(task));
  } catch (error) {
    logError(error);
    res.json(createResponse(error));
  }
});

// reading a task
router.get("/:id", async (req, res) => {
  try {
    const task = await getResource(
			req.params.id,
			Task.findById.bind(Task)
		);

    // Create log event.
    logEvent(TaskEvent, {
      message: Messages.TEMPLATE_TASK_READ,
      owner: req.user,
      task
    }, false);
    res.json(createResponse(task));
  } catch (error) {
    logError(error);
    res.json(createResponse(error));
  }
});

// updating a task
router.patch("/:id", async (req, res) => {
  try {
    const { updates, message } = req.body;
    const task = await getResource(
      req.params.id,
      Task.findByIdAndUpdate(Task),
      updates
    );

    task.fields = Object.keys(updates).join(',');
    task.values = Object.values(updates).join(',');
    logEvent(TaskEvent, {
      message: Messages.TEMPLATE_TASK_UPDATE,
      owner: req.user,
      task
    })
    if (updates.statues && updates.statues === 'complete' && message) {
      logEvent(MessageEvent, {
        message: Messages.TEMPLATE_SEND_MESSAGE,
        owner: req.user,
        user: task.teacher,
        body: message,
        task
      }, false);
		}
    res.json(createResponse(task));
  } catch (error) {
    logError(error);
    res.json(createResponse(error));
  }
});

// deleting a task
router.delete("/:id", async (req, res) => {
  try {
    const task = await getResource(
      req.params.id,
      Task.findByIdAndRemove(Task)
    );
    res.json(createResponse(task));
  } catch (error) {
    logError(error);
    res.json(createResponse(error));
  }
});

module.exports = router;
