const express = require("express");
const router = express.Router();
const pool = require("../index");

// GET: Return all items
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM items");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error",
    });
  }
});

// POST: Create a new item
router.post("/", async (req, res) => {
  try {
    let result;

    if (req.body.item_name && req.body.price !== undefined) {
      result = await pool.query(
        "INSERT INTO items (item_name, price) VALUES ($1, $2)",
        [req.body.item_name, req.body.price],
      );
    } else if (req.body.item_name) {
      result = await pool.query("INSERT INTO items (item_name) VALUES ($1)", [
        req.body.item_name,
      ]);
    } else {
      return res.status(400).json({
        message: "Invalid item data",
      });
    }

    result = await pool.query("SELECT * FROM items ORDER BY id DESC");

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error",
    });
  }
});

// Find item by ID
router
  .route("/:id")

  // GET: Return one item
  .get(async (req, res) => {
    try {
      const result = await pool.query("SELECT * FROM items WHERE id = $1", [
        req.params.id,
      ]);

      if (result.rows.length === 0) {
        return res.status(404).json({
          message: "Item not found",
        });
      }

      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Server error",
      });
    }
  })

  // PUT: Update item
  .put(async (req, res) => {
    try {
      if (req.body.item_name && req.body.price !== undefined) {
        await pool.query(
          "UPDATE items SET item_name = $1, price = $2 WHERE id = $3",
          [req.body.item_name, req.body.price, req.params.id],
        );
      } else if (req.body.item_name) {
        await pool.query("UPDATE items SET item_name = $1 WHERE id = $2", [
          req.body.item_name,
          req.params.id,
        ]);
      } else if (req.body.price !== undefined) {
        await pool.query("UPDATE items SET price = $1 WHERE id = $2", [
          req.body.price,
          req.params.id,
        ]);
      } else {
        return res.status(400).json({
          message: "Invalid item data",
        });
      }

      const result = await pool.query("SELECT * FROM items WHERE id = $1", [
        req.params.id,
      ]);

      if (result.rows.length === 0) {
        return res.status(404).json({
          message: "Item not found",
        });
      }

      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Server error",
      });
    }
  })

  // DELETE: Delete item
  .delete(async (req, res) => {
    try {
      const result = await pool.query("DELETE FROM items WHERE id = $1", [
        req.params.id,
      ]);

      if (result.rowCount === 0) {
        return res.status(404).json({
          message: "Item not found",
        });
      }

      res.json({
        message: "Item deleted successfully",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Server error",
      });
    }
  });

module.exports = router;
