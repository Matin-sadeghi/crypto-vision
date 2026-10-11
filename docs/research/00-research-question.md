# 00 - Research Question

> **Status:** Draft v1 (living document)
> **Owner:** TODO (Hannah)
> **Last updated:** TODO (10/11/2026)

## 1. Goal

Predict whether the price of a cryptocurrency will move **up** or **down**
over a short future horizon, using its recent historical market data.
The model's output will be served through a Django REST API and shown
on a Next.js dashboard.

This is a learning and portfolio project. It is **not** financial advice
and **not** a trading system.

## 2. Scope (version 1)

| Item               | Decision                                       |
| ------------------ | ---------------------------------------------- |
| Asset              | Bitcoin (BTC), quoted in USD                   |
| Data granularity   | Daily candles (open, high, low, close, volume) |
| Input window       | Last 30 days                                   |
| Prediction horizon | 1 day ahead                                    |
| Task type          | Binary classification (up / down)              |

Both the input window and the horizon are treated as **configurable
parameters** so we can experiment with other values (e.g. 7-day window,
7-day horizon) without rewriting the pipeline.

Out of scope for version 1: other coins, intraday data, sentiment data,
on-chain data, and any automated trading.

## 3. Target definition

For a day `t`:

- **Up (1):** `close(t + 1) > close(t)`
- **Down (0):** otherwise

Version 1 uses no minimum-move threshold. We will revisit this after
looking at the class balance and how many days have near-zero change
(see Open questions).

## 4. Success criteria

All evaluation uses a **chronological split** (older data for training,
newer data for validation and testing). Random splits are not allowed.

The model is considered useful only if it beats both baselines on the
test period:

- **Baseline A (majority class):** always predict the most frequent class
  in the training set.
- **Baseline B (persistence):** predict that tomorrow's direction equals
  today's direction.

Reported metrics: accuracy, precision, recall and F1, plus the class
distribution of the test set.

We make **no claim of profitability**. Results close to the baselines
are an acceptable and honest outcome.

## 5. Known risks

- **Data leakage:** features must only use information available at the
  prediction time `t` (no future values, no scaling fitted on test data).
- **Non-chronological splitting:** would inflate results.
- **Overfitting through repeated trials:** the more models and settings
  we try, the higher the chance that a good result is accidental.
- **Market regime changes:** patterns from past years may not hold now.
- **Market efficiency:** short-term price direction may be close to
  unpredictable; the literature suggests only occasional inefficiencies.

## 6. Open questions

- Which features are worth testing first (returns, moving averages, RSI,
  volume)? See `02-features.md` (to be written).
- How many years of history do we need?
- Should small moves (e.g. below +/-0.5%) be excluded from the labels?
- Is a 1-day horizon too noisy compared to a 7-day horizon?
- How should we tune models without overfitting the validation period?

## 7. Planned documents

- `01-literature-review.md` - notes on each paper
- `02-features.md` - candidate features and why
- `03-preprocessing.md` - cleaning, scaling and splitting rules
- `04-experiments.md` - hypotheses and results

## Changelog

- v1: initial draft of scope, target and success criteria.
