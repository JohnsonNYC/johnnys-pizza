# Pizza Ordering System Frontend Project

## Overview

Build a type-safe React application for a pizza ordering system with both customer-facing and employee-facing views. This project is designed to showcase your skills in understanding product requirements, working with TypeScript and React, and demonstrating an intuition for good UX design.

You're encouraged to take this project in a direction of your choice while meeting the minimum requirements listed below. Feel free to use any frontend frameworks or libraries, and be prepared to explain your technical decisions during the review. Note that the `locationId` provided to you will be unique to your test.

## Minimum App Requirements

### 1. Customer Ordering Flow

#### Menu View

      Pizza Selection
         - Customers can choose from "Specialty Pizzas" or create a custom pizza.
         - For specialty pizzas, allow customers to select the size, add extra toppings, or exclude default toppings.
         - Custom pizzas should support full topping selection with size-based pricing.
      Quantity Selection
         - Allow customers to select quantities for each item.

#### Checkout Cart

      Cart Display
         - Display all selected items, each with its total price.
         - Allow order edits, such as updating quantities or removing items.
      Checkout Action
         - Provide an option to proceed to checkout with the selected items.

#### Checkout

      Customer Information
         - Collect necessary customer details for delivery or pickup.
      Order Summary
         - Display an itemized summary of the order, including prices and the total amount.
      Payment
         - Support payment methods of "credit card" and "cash."
      Order Submission
         - Confirm and submit the order.

### 2. Employee Orders Dashboard

#### Order Table

      - Display all orders for a specific location, including details such as order ID, status, and total amount.

#### Order Status Updates

      - Allow employees to update the status of each order.

### 3. Order Status Check for Customers

#### Order Lookup

      - Customers can enter an order ID to check the status of their order.
      - If the order status is "pending," customers should have the option to cancel the order.

## Submission Requirements

- Deploy your React app in a hosted environment of your choice.
- Share the link to your GitHub repository with the source code for the project.

## Notes For the Team

- Thanks for this fun assessment and the ability to go in any direction so I tried to go all out in the design
- Some few things I would do better include

1. Better Error Handlings within my forms
   - Currently, the "Place Order" button in /payments is just disabled if there is nothing inside the inputs to collect customer details.
2. Better validations withing my forms
   - As of writing this, I have not included basics tests like regex for email, phone number, etc..
3. Updating the logic for extra toppings. As of now adding toppings will work appropraitey for custom and specialty.
   Removing items from a specialty pizza will decrease the price by however much an item by quantity costs (which doesn't feel expected);
4. If you add any specialty pizzas with extra cheese, the order summary will show it as an excluded topping. This is due to some missing logic inside of pizzaFormHooks.tsx
5. Lastly, I'll be working on some of these past the submission date so please ignore a point if they have already been handled! Thanks, Team!
