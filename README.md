# ECON3111 Online Laboratory

Interactive simulations, experiments and quizzes for ECON3111 Behavioural Economics (University of Newcastle, 2027). Plain HTML, CSS and JavaScript: no build step, no external libraries, and nothing is sent to a server.

## Deploying on GitHub Pages

1. On GitHub (account `DrGenie`), create a public repository named **`econ3111-lab`**.
2. Upload everything in this folder, keeping the `assets/` and `podcast/` folders and the `.nojekyll` file.
3. In the repository, open **Settings > Pages > Build and deployment > Deploy from a branch**, select branch `main` and folder `/ (root)`, and save.
4. After about a minute the site is available at `https://drgenie.github.io/econ3111-lab/`.

All QR codes in the 2027 slides point to this address. If a different repository name or address is used, replace `drgenie.github.io/econ3111-lab` in the `.tex` files and recompile the decks.

## Pages

| Week | Page | Activities |
|---|---|---|
| 1 | `w01-money-pump.html` | Completeness and transitivity of your own preferences; the money pump; utility representation; descriptive or normative quiz |
| 2 | `w02-context-lab.html` | Decoy effect with simulated consumers; anchoring; mental accounting; six sunk cost and opportunity cost cases |
| 3 | `w03-bayes-machine.html` | Bayes' rule with 1,000 people shown as squares (presets: AI detection, mammography, taxi cab, fraud); the Monty Hall problem |
| 4 | `w04-are-you-random.html` | Randomness test; conjunctions and disjunctions; the Linda problem; identify the heuristic (eight cases) |
| 5 | `w05-risk-lab.html` | Deal or No Deal; Holt and Laury task; certainty equivalents and risk premiums; St Petersburg simulation |
| 6 | `w06-prospect-studio.html` | Value and weighting functions; prospect evaluation; fourfold pattern; Allais and Ellsberg problems |
| 7 | `w07-time-machine.html` | Estimating the discount rate; the cost of short-term credit; exponential and hyperbolic discounting |
| 8 | `w08-future-you.html` | Which film to miss (naive, sophisticated and time consistent); the cake example; the peak-end rule |
| 9 | `w09-game-lab.html` | Two-by-two game solver (dominance, pure and mixed equilibria); repeated prisoners' dilemma and tournament |
| 10 | `w10-fairness-lab.html` | Ultimatum game against five responders; beauty contest with level-k players; public goods game with punishment |
| 11 | `w11-nudge-studio.html` | Designing a nudge for 10,000 simulated students; nudge, incentive or mandate quiz; dark patterns |
| 12 | `w12-revision-quiz.html` | Twenty-two revision questions with explanations and results by week |
| | `live-lab.html` | For the lecturer: enter class answers to display histograms, the number game winner, anchoring by group and split-class comparisons |
| | `podcast.html` | Thirteen course episodes with audio and transcripts, and links to further episodes |

## Podcast audio

The thirteen episodes (`podcast/audio/ep00.mp3` to `ep12.mp3`) were generated with two synthetic voices from the scripts in `../podcast/ECON3111_Podcast_Scripts_2027.md`. No recording is needed. To change an episode, edit the script and regenerate the audio, or replace the mp3 file with a recording of the same name.

## Notes

The simulated populations (decoy effect, ultimatum responders, public goods players, nudge design) use illustrative parameters chosen for teaching. They show mechanisms, not estimates, and the pages say so.
