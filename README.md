# ECON3111 Lab

Interactive simulations for ECON3111 Behavioural Economics (University of Newcastle, 2027). Plain HTML, CSS and JavaScript: no build step, no external libraries, nothing sent to a server.

## Deploy on GitHub Pages (about 5 minutes)

1. On GitHub (account `DrGenie`), create a new public repository named **`econ3111-lab`**.
2. Upload everything in this folder (keep the `assets/` and `podcast/` folders and the `.nojekyll` file).
3. In the repository: **Settings > Pages > Build and deployment > Deploy from a branch**, branch `main`, folder `/ (root)`. Save.
4. After a minute the site is live at `https://drgenie.github.io/econ3111-lab/`.

All QR codes in the 2027 slides point to that address. If your user site uses a custom domain (for example mesfingenie.com), GitHub will redirect the `github.io` address to `mesfingenie.com/econ3111-lab/`, so the QR codes still work. If you use a different repository name, find and replace `drgenie.github.io/econ3111-lab` in the `.tex` files and recompile.

## Pages

| Week | Page | What students do |
|---|---|---|
| 1 | `w01-money-pump.html` | Pairwise choices; completeness and transitivity check; money pump; utility representation |
| 2 | `w02-context-lab.html` | Decoy builder with simulated shoppers; anchoring task; integrate vs segregate calculator |
| 3 | `w03-bayes-machine.html` | 1,000-person icon array with presets (AI detector, mammogram, cab, fraud); Monty Hall play and simulation |
| 4 | `w04-are-you-random.html` | Randomness grader; conjunction and planning calculator; Linda |
| 5 | `w05-risk-lab.html` | Holt and Laury risk task; EU, CE and risk premium with chosen utility; St Petersburg simulator |
| 6 | `w06-prospect-studio.html` | Value and weighting curves; prospect evaluator; fourfold pattern; Allais and Ellsberg check |
| 7 | `w07-time-machine.html` | Titration of discount rates (detects present bias); true cost of credit; exponential vs beta-delta |
| 8 | `w08-future-you.html` | Naive, sophisticated and exponential movie game; cake reversal; peak-end rule |
| 9 | `w09-game-lab.html` | 2x2 solver (pure and mixed equilibria, dominance); repeated PD; Axelrod tournament |
| 10 | `w10-fairness-lab.html` | Ultimatum against five hidden inequality-averse bots; beauty contest by level-k; public goods with punishment |
| 11 | `w11-nudge-studio.html` | Choice architecture for 10,000 simulated students; dark pattern quiz |
| 12 | `w12-final-boss.html` | Six-category quiz board with team scores |
| | `live-lab.html` | For the lecturer: paste class answers to show histograms, the number-game winner, anchoring by group, split-room votes |
| | `podcast.html` | All 13 episodes with transcripts; plays `podcast/audio/epXX.mp3` once uploaded |

## Adding the podcast audio

Record the scripts in `../podcast/episodes/`, export as `ep00.mp3` to `ep12.mp3`, and upload them to `podcast/audio/`. Until a file exists, the page shows the transcript.

## Notes

Simulated populations in the Context Lab, Fairness Lab and Nudge Studio use illustrative parameters chosen for teaching. They show mechanisms, not estimates, and the pages say so.
