# Lightning timing · round 08 follow-up

The former implementation was jittered periodic scheduling: exactly one onset in each interval of length 1/rate. It imposed bounded gaps and a roughly regular rhythm. Every medium/large event also repeated after the same delay. That was an implementation convenience, not a model of observed lightning.

## Research and interpretation

- [Gou et al., 2018, Time Correlations of Lightning Flash Sequences in Thunderstorms Revealed by Fractal Analysis](https://agupubs.onlinelibrary.wiley.com/doi/10.1002/2017JD027206): flash sequences in their thunderstorm sample show temporal correlations; independent constant-rate Poisson arrivals do not capture all timescales.
- [Yair et al., 2009, Clustering and synchronization of lightning flashes in adjacent thunderstorm cells](https://agupubs.onlinelibrary.wiley.com/doi/full/10.1029/2008JD010738): observed short-interval clustering and strongly skewed waiting times, including long gaps. Do not conflate their specific event grouping and reported intervals with a universal visible-flash distribution.
- [Peterson and Rudlosky, The Time Evolution of Optical Lightning Flashes](https://repository.library.noaa.gov/view/noaa/31841/noaa_31841_DS1.pdf): multiple optical series within a flash have a distinct faster timescale. Bright series can be separated by a few dozen milliseconds; the paper also discusses ground-stroke geometric means around 40–70 ms.
- [NOAA/NSSL lightning detection](https://www.nssl.noaa.gov/education/svrwx101/lightning/detection/): multiple return strokes in one cloud-to-ground flash can appear as visible channel flicker.

These observations motivate a two-timescale visual approximation. They do not establish one universal lightning distribution or validate the exact process/parameters used below. Small/medium/large are our artistic categories, not meteorological event classes.

## Implementation

`lightning-timing.ts` uses a two-state Markov-modulated Poisson process. Conditional on storm activity, each size has independent exponential arrivals. Shared quiet and active states have exponential mean dwell times of 12 and 4 seconds × the timescale control. Their rate multipliers are 1 − .9b and 1 + 2.7b, where b is burstiness. The stationary active fraction is 1/4, so the long-run mean multiplier is one. Burstiness zero is an ordinary homogeneous Poisson baseline. The timescales and contrast are art direction, not a fit to the papers.

Individual flashes receive 1–5 stochastic strokes. Re-flash tendency controls whether another stroke occurs. Interstroke gaps use a lognormal variation around 55 ms, truncated to 25–180 ms for this display. Pulse lengths and brightness vary; duration remains an independent artistic multiplier. Repeated strokes reuse the flash's path/target. They do not increase the configured new-flash rate.

Schedules are seeded by the shape seed, cached and independent of animation frame rate. Backward seeking reconstructs the same state. Multiple flashes may overlap; the existing 80-segment rendering budget preserves whole paths and prioritizes large then medium strikes if extreme settings exceed it. Per-flash border caches avoid repeated expensive geometry searches during re-flashes and overlaps. This limit can suppress some small events at extreme rates; it does not alter the underlying event schedule.

## Validation

The deterministic 12,000-second distribution check yields Poisson waiting-time CV ≈1.00 and 10-second count Fano factor ≈1.01. At default burstiness, CV ≈1.84 and Fano factor ≈8.45; the mean small-flash rate remains within 4% of the requested 1.2/s. This checks intentional lulls/clustering and retained average frequency, not meteorological accuracy. Tests also cover seed differences, backward seeking, rates at zero, intraflash gap bounds and optional re-flashes, finite forks and actual target contacts.
