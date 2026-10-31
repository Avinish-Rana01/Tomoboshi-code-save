import { useEffect, useState, type CSSProperties } from "react"

const assetPathPrefix = "/assets"
const successTick = `${assetPathPrefix}/504be.png`
const successCircle = `${assetPathPrefix}/267bf.svg`
const mapImage = `${assetPathPrefix}/c30fb.png`
const readyMarker = `${assetPathPrefix}/08c22.png`
const readyMarkerBacking = `${assetPathPrefix}/4277a.svg`
const capturedMarker = `${assetPathPrefix}/f0451.png`
const lockedMarker = `${assetPathPrefix}/8e9eb.png`
const markerPointer = `${assetPathPrefix}/55367.svg`
const adventuresIcon = `${assetPathPrefix}/6b950.png`
const mapIcon = `${assetPathPrefix}/f154c.png`
const profileIcon = `${assetPathPrefix}/f422b.png`
const sheetHandle = `${assetPathPrefix}/efdf0.svg`
const tomoboshiLogo = `${assetPathPrefix}/20c4b.png`
const adventureScreenIcon = `${assetPathPrefix}/2b883.png`
const adventureScreenMapIcon = `${assetPathPrefix}/e6032.png`
const statusDot = `${assetPathPrefix}/cd260.svg`
const profileBackIcon = `${assetPathPrefix}/57f18.svg`
const profileEmailIcon = `${assetPathPrefix}/633cb.png`
const profileBellIcon = `${assetPathPrefix}/773fa.png`
const profileLocationIcon = `${assetPathPrefix}/6a772.png`
const profileHelpIcon = `${assetPathPrefix}/256cb.png`
const profileTermsIcon = `${assetPathPrefix}/dc8b8.png`
const profilePrivacyIcon = `${assetPathPrefix}/7eb46.png`
const profileLogoutIcon = `${assetPathPrefix}/3864f.png`
const profileDeleteIcon = `${assetPathPrefix}/32aa2.png`
const profileChevron = `${assetPathPrefix}/377a7.png`
const profileMutedChevron = `${assetPathPrefix}/0323c.png`
const profileActiveIcon = `${assetPathPrefix}/a7f59.png`

const coinFlights = [
  { x: -142, endX: -18, delay: 0, size: 24, spin: -320 },
  { x: 118, endX: 14, delay: 90, size: 20, spin: 280 },
  { x: -76, endX: 7, delay: 170, size: 18, spin: 360 },
  { x: 158, endX: -8, delay: 240, size: 26, spin: -290 },
  { x: 34, endX: 18, delay: 320, size: 21, spin: 420 },
  { x: -174, endX: -4, delay: 390, size: 19, spin: 300 },
  { x: 88, endX: 5, delay: 470, size: 23, spin: -380 },
  { x: -24, endX: -12, delay: 540, size: 17, spin: 350 },
  { x: 180, endX: 11, delay: 610, size: 20, spin: 300 },
  { x: -116, endX: 0, delay: 680, size: 22, spin: -420 },
]

const rewardVariants = [
  "Classic",
  "Midnight",
  "Golden glow",
  "Double coin",
  "Coin crown",
  "Glass",
  "Split",
  "Minimal",
  "Emerald seal",
  "Aurora foil",
  "Heritage",
  "Number capsule",
  "Ivory luxe",
  "Rose alloy",
  "Jackpot",
] as const

function CoinIcon({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`coin-face relative flex size-6 shrink-0 items-center justify-center rounded-full border-2 border-[#e6a817] bg-[linear-gradient(145deg,#ffe894_15%,#ffc83d_58%,#e8a414_100%)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_2px_4px_rgba(169,112,0,0.22)] ${className}`}
    >
      <span className="size-2.5 rounded-full border border-[#b97908]/65" />
      <span className="absolute left-1.5 top-1 h-1.5 w-1 rounded-full bg-white/60" />
    </span>
  )
}

function RewardPill({
  coins,
  showPlus = true,
  variant,
}: {
  coins: number
  showPlus?: boolean
  variant: number
}) {
  const label = (
    <span className="reward-value" aria-hidden="true">
      {showPlus && "+"}
      {coins} <span className="reward-unit">coins</span>
    </span>
  )

  return (
    <div
      aria-label={`${
        showPlus ? "+" : ""
      }${coins} coins, ${rewardVariants[variant]} style`}
      className={`reward-style-switch reward-variant reward-variant-${variant + 1}`}
    >
      {variant === 4 && (
        <span className="reward-crown-spark" aria-hidden="true" />
      )}
      <span className="reward-coins" aria-hidden="true">
        <CoinIcon />
        {(variant === 3 || variant === 4) && (
          <CoinIcon className="reward-coin-extra" />
        )}
      </span>
      {variant === 6 ? (
        <>
          {showPlus && (
            <span className="reward-plus" aria-hidden="true">
              +
            </span>
          )}
          <span className="reward-number" aria-hidden="true">
            {coins}
          </span>
          <span className="reward-divider" aria-hidden="true" />
          <span className="reward-unit" aria-hidden="true">
            coins
          </span>
        </>
      ) : (
        label
      )}
    </div>
  )
}

function CoinBurst() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-20 overflow-hidden"
    >
      {coinFlights.map((coin, index) => (
        <span
          className="coin-flight absolute left-1/2 top-1/2"
          key={index}
          style={
            {
              "--coin-delay": `${coin.delay}ms`,
              "--coin-end-x": `${coin.endX}px`,
              "--coin-mid-x": `${coin.x * 0.42}px`,
              "--coin-size": `${coin.size}px`,
              "--coin-spin": `${coin.spin}deg`,
              "--coin-x": `${coin.x}px`,
            } as CSSProperties
          }
        >
          <CoinIcon className="size-full" />
        </span>
      ))}
    </div>
  )
}

function CaptureWidget({ rewardVariant }: { rewardVariant: number }) {
  const [coins, setCoins] = useState(0)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCoins(50)
      return
    }

    let frame = 0
    const startDelay = window.setTimeout(() => {
      const startedAt = performance.now()
      const duration = 650

      const updateCount = (now: number) => {
        const progress = Math.min((now - startedAt) / duration, 1)
        const easedProgress = 1 - Math.pow(1 - progress, 3)
        setCoins(Math.round(easedProgress * 50))

        if (progress < 1) {
          frame = requestAnimationFrame(updateCount)
        }
      }

      frame = requestAnimationFrame(updateCount)
    }, 1080)

    return () => {
      window.clearTimeout(startDelay)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div
      aria-label="Captured successfully. 50 coins added."
      aria-live="polite"
      className="capture-widget relative z-10 flex w-[min(280px,calc(100vw-32px))] flex-col items-center justify-center rounded-[34px] border-[0.5px] border-white/50 bg-white/75 px-5 py-4 backdrop-blur-[5px]"
      role="status"
    >
      <div
        className="success-tick relative size-[50px] shrink-0"
        aria-hidden="true"
      >
        <img
          alt=""
          className="absolute inset-0 block size-[50px] max-w-none"
          height="50"
          src={successCircle}
          width="50"
        />
        <img
          alt=""
          className="absolute left-[10px] top-[10px] block size-[31px] max-w-none object-cover"
          height="31"
          src={successTick}
          width="31"
        />
      </div>

      <p className="mt-1 whitespace-nowrap font-['Gowun_Batang:Bold'] text-[20px] leading-[37px] font-bold text-black">
        Captured Sucessfully
      </p>

      <div className="coin-reward">
        <RewardPill coins={coins} key={rewardVariant} variant={rewardVariant} />
      </div>
    </div>
  )
}

const capturedMarkers = [
  { left: "16.1%", top: "15.4%" },
  { left: "36.4%", top: "30.5%", small: true },
  { left: "76.1%", top: "20.4%" },
  { left: "66.1%", top: "52.8%" },
]

const lockedMarkers = [
  { left: "31.6%", top: "72.1%" },
  { left: "71.8%", top: "76.6%" },
]

function MapMarker({
  image,
  left,
  top,
  small = false,
}: {
  image: string
  left: string
  top: string
  small?: boolean
}) {
  const size = small ? "w-[37px]" : "w-[54px]"

  return (
    <div
      aria-hidden="true"
      className={`absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center ${size}`}
      style={{ left, top }}
    >
      <img
        alt=""
        className="relative z-10 aspect-square w-full object-contain"
        src={image}
      />
      <img
        alt=""
        className="-mt-2.5 h-[17px] w-[18px] rotate-180"
        src={markerPointer}
      />
    </div>
  )
}

function MapScreen({
  onOpenAdventures,
  onOpenCapture,
  onOpenProfile,
}: {
  onOpenAdventures: () => void
  onOpenCapture: () => void
  onOpenProfile: () => void
}) {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-[#e8e2dc]">
      <img
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        src={mapImage}
      />

      {capturedMarkers.map((marker) => (
        <MapMarker
          image={capturedMarker}
          key={`${marker.left}-${marker.top}`}
          {...marker}
        />
      ))}
      {lockedMarkers.map((marker) => (
        <MapMarker
          image={lockedMarker}
          key={`${marker.left}-${marker.top}`}
          {...marker}
        />
      ))}

      <button
        aria-label="Open Gold Name capture details"
        className="ready-marker absolute left-[23.6%] top-[52.1%] z-10 h-[76px] w-[54px] -translate-x-1/2 -translate-y-1/2 cursor-pointer border-0 bg-transparent p-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
        onClick={onOpenCapture}
        type="button"
      >
        <span className="ready-marker-ripple absolute top-[3px] left-1/2">
          <img alt="" src={readyMarkerBacking} />
        </span>
        <span className="ready-marker-coin absolute top-[7px] left-0 flex h-[62px] w-[54px] flex-col items-center">
          <img
            alt=""
            className="relative z-10 aspect-square w-[54px] shrink-0 object-contain"
            src={readyMarker}
          />
          <span className="-mt-2.5 flex h-[17px] w-[18px] shrink-0 rotate-180 items-center justify-center">
            <img alt="" src={markerPointer} />
          </span>
        </span>
      </button>

      <nav
        aria-label="Primary"
        className="absolute inset-x-0 bottom-0 z-10 flex h-[68px] items-center justify-around bg-[#f5c542]/95 pb-[6px] shadow-[inset_0_-2px_4px_rgba(0,0,0,0.2),inset_0_0_4px_rgba(0,0,0,0.4)] backdrop-blur-[5px]"
      >
        <button
          className="map-nav-item cursor-pointer border-0 bg-transparent"
          onClick={onOpenAdventures}
          type="button"
        >
          <img alt="" src={adventuresIcon} />
          <span>Adventures</span>
        </button>
        <button
          aria-current="page"
          className="map-nav-item border-0 bg-transparent"
          type="button"
        >
          <img alt="" src={mapIcon} />
          <span>Map</span>
        </button>
        <button
          className="map-nav-item cursor-pointer border-0 bg-transparent"
          onClick={onOpenProfile}
          type="button"
        >
          <img alt="" src={profileIcon} />
          <span>Profile</span>
        </button>
      </nav>
    </main>
  )
}

type AdventureStatus = "not-started" | "in-progress" | "completed"

function AdventureScreen({
  onOpenLeaderboard,
  onOpenMap,
  onOpenProfile,
}: {
  onOpenLeaderboard: () => void
  onOpenMap: () => void
  onOpenProfile: () => void
}) {
  const [status, setStatus] = useState<AdventureStatus>("not-started")

  const statusTabs: { id: AdventureStatus label: string }[] = [
    { id: "not-started", label: "Not Started" },
    { id: "in-progress", label: "In Progress" },
    { id: "completed", label: "Completed" },
  ]

  return (
    <main className="adventure-screen min-h-dvh bg-white text-black">
      <header className="adventure-header">
        <div className="adventure-header-row">
          <div className="adventure-brand" aria-label="Tomoboshi">
            <span>TOM</span>
            <img alt="" height="18" src={tomoboshiLogo} width="18" />
            <span>BOSHI</span>
          </div>
          <button
            aria-label="Open leaderboard"
            className="leaderboard-link"
            onClick={onOpenLeaderboard}
            type="button"
          >
            <span className="leaderboard-link-icon">
              <svg
                aria-hidden="true"
                fill="none"
                height="19"
                viewBox="0 0 16 16"
                width="19"
              >
                <path
                  d="M5 2.5h6v2.75A3 3 0 0 1 8 8.25a3 3 0 0 1-3-3V2.5Z"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="1.1"
                />
                <path
                  d="M5 4H2.75v.75A2.25 2.25 0 0 0 5 7m6-3h2.25v.75A2.25 2.25 0 0 1 11 7M8 8.5V11m-2.25 2.5h4.5M6.5 11h3"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.4"
                />
              </svg>
            </span>
            <span className="leaderboard-link-copy">
              <strong>Leaderboard</strong>
              <small>Top Adventurers</small>
            </span>
            <span aria-hidden="true" className="leaderboard-link-chevron">
              ›
            </span>
          </button>
        </div>

        <div
          className="adventure-status-tabs"
          data-active={status}
          role="tablist"
          aria-label="Adventure status"
        >
          {statusTabs.map((tab) => (
            <button
              aria-selected={status === tab.id}
              className={status === tab.id ? "is-active" : ""}
              key={tab.id}
              onClick={() => setStatus(tab.id)}
              role="tab"
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      <section
        className="adventure-content"
        aria-labelledby="adventures-heading"
      >
        <h1 id="adventures-heading">Adventures</h1>

        {status === "not-started" ? (
          <article className="adventure-card">
            <div className="adventure-card-header">
              <h2>Sonoma Wine Trail</h2>
              <p>
                <img alt="" height="4" src={statusDot} width="4" />
                <span>Not Started</span>
              </p>
            </div>
            <div className="adventure-card-description">
              <p>Visit 5 wineries and capture all flags</p>
              <p>You must physically be there.</p>
            </div>
            <div className="adventure-card-footer">
              <p>Valid: Jan 20-Feb 1</p>
              <p>0 / 5 flags captured</p>
            </div>
          </article>
        ) : (
          <p className="adventure-empty">No adventures here yet.</p>
        )}
      </section>

      <nav className="adventure-tab-bar" aria-label="Primary">
        <button aria-current="page" className="map-nav-item" type="button">
          <img alt="" src={adventureScreenIcon} />
          <span>Adventures</span>
        </button>
        <button
          className="map-nav-item cursor-pointer"
          onClick={onOpenMap}
          type="button"
        >
          <img alt="" src={adventureScreenMapIcon} />
          <span>Map</span>
        </button>
        <button className="map-nav-item cursor-pointer" onClick={onOpenProfile} type="button">
          <img alt="" src={profileIcon} />
          <span>Profile</span>
        </button>
      </nav>
    </main>
  )
}

type LeaderboardPeriod = "all" | "month" | "friends"

const leaderboardEntries = [
  {
    name: "Amara Chen",
    initials: "AC",
    avatar: `${assetPathPrefix}/leaderboard-avatar-4.jpg`,
    place: "Napa Valley",
    streak: 18,
    trend: 2,
    all: 12840,
    month: 2180,
    friends: 12840,
  },
  {
    name: "Leo Martin",
    initials: "LM",
    avatar: `${assetPathPrefix}/leaderboard-avatar-1.jpg`,
    place: "Lisbon",
    streak: 14,
    trend: 1,
    all: 11360,
    month: 2640,
    friends: 11360,
  },
  {
    name: "Maya Torres",
    initials: "MT",
    avatar: `${assetPathPrefix}/leaderboard-avatar-2.jpg`,
    place: "Sonoma",
    streak: 11,
    trend: 0,
    all: 9875,
    month: 1920,
    friends: 9875,
  },
  {
    name: "Noah Mensah",
    initials: "NM",
    avatar: `${assetPathPrefix}/leaderboard-avatar-3.jpg`,
    place: "Accra",
    streak: 9,
    trend: 3,
    all: 8240,
    month: 1740,
    friends: 8240,
  },
  {
    name: "Sofia Reyes",
    initials: "SR",
    avatar: `${assetPathPrefix}/leaderboard-avatar-6.jpg`,
    place: "Mexico City",
    streak: 8,
    trend: -1,
    all: 7690,
    month: 2290,
    friends: 7690,
  },
  {
    name: "Elias Brooks",
    initials: "EB",
    avatar: `${assetPathPrefix}/leaderboard-avatar-5.jpg`,
    place: "Austin",
    streak: 7,
    trend: 1,
    all: 6430,
    month: 1360,
    friends: 6430,
  },
  {
    name: "Priya Shah",
    initials: "PS",
    avatar: `${assetPathPrefix}/leaderboard-avatar-7.jpg`,
    place: "Mumbai",
    streak: 6,
    trend: -2,
    all: 5120,
    month: 1180,
    friends: 5120,
  },
  {
    name: "Alex Rivera",
    initials: "AR",
    avatar: null,
    place: "You",
    streak: 12,
    trend: 3,
    all: 4890,
    month: 1540,
    friends: 4890,
    current: true,
  },
]

function LeaderboardAvatar({
  avatar,
  initials,
  name,
}: {
  avatar: string | null
  initials: string
  name: string
}) {
  return avatar ? (
    <img alt={`${name} profile`} className="leaderboard-avatar" src={avatar} />
  ) : (
    <span aria-label={`${name} profile`} className="leaderboard-avatar leaderboard-avatar-you">
      {initials}
    </span>
  )
}

function LeaderboardScreen({ onBack }: { onBack: () => void }) {
  const [period, setPeriod] = useState<LeaderboardPeriod>("all")
  const sortedEntries = [...leaderboardEntries].sort((a, b) => b[period] - a[period])
  const podiumEntries = [sortedEntries[1], sortedEntries[0], sortedEntries[2]]
  const currentIndex = sortedEntries.findIndex((entry) => entry.current)
  const currentEntry = sortedEntries[currentIndex]
  const nextEntry = sortedEntries[currentIndex - 1]
  const coinsToNext = nextEntry ? nextEntry[period] - currentEntry[period] : 0

  return (
    <main className="leaderboard-screen min-h-dvh bg-white text-black">
      <header className="leaderboard-header">
        <button
          aria-label="Back to adventures"
          className="leaderboard-back"
          onClick={onBack}
          type="button"
        >
          <span aria-hidden="true">‹</span>
        </button>
        <div>
          <p>Golden Trail</p>
          <h1>Leaderboard</h1>
        </div>
      </header>

      <section className="leaderboard-intro" aria-labelledby="leaderboard-intro-title">
        <div>
          <p className="leaderboard-kicker">Top adventurers</p>
          <h2 id="leaderboard-intro-title">Every coin tells a story.</h2>
          <p>Collect flags, climb the trail, and earn your place among this season’s explorers.</p>
        </div>
        <div className="leaderboard-season-mark" aria-label="Season 4">
          <span>S</span>
          <strong>04</strong>
        </div>
      </section>

      <div className="leaderboard-periods" role="tablist" aria-label="Leaderboard period">
        {(
          [
            ["all", "All time"],
            ["month", "This month"],
            ["friends", "Friends"],
          ] as const
        ).map(([id, label]) => (
          <button
            aria-selected={period === id}
            className={period === id ? "is-active" : ""}
            key={id}
            onClick={() => setPeriod(id)}
            role="tab"
            type="button"
          >
            {label}
          </button>
        ))}
      </div>

      <section className="leaderboard-podium" aria-label="Top three adventurers">
        {podiumEntries.map((entry) => {
          const rank = sortedEntries.indexOf(entry) + 1

          return (
            <article className={`podium-player podium-player-${rank}`} key={entry.name}>
              <div className="podium-avatar-wrap">
                {rank === 1 && (
                  <svg
                    aria-hidden="true"
                    className="podium-crown"
                    fill="none"
                    viewBox="0 0 36 24"
                  >
                    <path
                      d="m3 5 8 6 7-9 7 9 8-6-3 15H6L3 5Z"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                )}
                <LeaderboardAvatar avatar={entry.avatar} initials={entry.initials} name={entry.name} />
                <span className="podium-rank">{rank}</span>
              </div>
              <h3>{entry.name.split(" ")[0]}</h3>
              <p>
                <CoinIcon />
                <strong>{entry[period].toLocaleString()}</strong>
              </p>
              <div className="podium-base" aria-hidden="true">
                <span>{rank}</span>
              </div>
            </article>
          )
        })}
      </section>

      <section className="leaderboard-standing" aria-labelledby="your-standing-title">
        <div className="leaderboard-standing-copy">
          <p>Your standing</p>
          <h2 id="your-standing-title">Rank #{currentIndex + 1}</h2>
          <span>
            {coinsToNext.toLocaleString()} coins to pass {nextEntry?.name.split(" ")[0]}
          </span>
        </div>
        <div className="leaderboard-standing-total">
          <span>+{currentEntry.trend}</span>
          <strong>{currentEntry[period].toLocaleString()}</strong>
          <small>coins</small>
        </div>
        <div className="leaderboard-standing-progress" aria-hidden="true">
          <span
            style={{
              width: `${Math.min(
                (currentEntry[period] / (nextEntry?.[period] || currentEntry[period])) * 100,
                100,
              )}%`,
            }}
          />
        </div>
      </section>

      <section className="leaderboard-rankings" aria-labelledby="rankings-title">
        <div className="leaderboard-section-heading">
          <div>
            <p>Live standings</p>
            <h2 id="rankings-title">Top adventurers</h2>
          </div>
          <span>{sortedEntries.length} ranked</span>
        </div>

        <div className="leaderboard-list">
          {sortedEntries.slice(3).map((entry, index) => {
            const rank = index + 4

            return (
              <article
                className={`leaderboard-row ${entry.current ? "is-current" : ""}`}
                key={entry.name}
              >
                <span className="leaderboard-row-rank">{rank}</span>
                <LeaderboardAvatar avatar={entry.avatar} initials={entry.initials} name={entry.name} />
                <div className="leaderboard-row-person">
                  <h3>
                    {entry.name}
                    {entry.current && <span>You</span>}
                  </h3>
                  <p>
                    {entry.place} · {entry.streak} day streak
                  </p>
                </div>
                <div className="leaderboard-row-score">
                  <strong>{entry[period].toLocaleString()}</strong>
                  <span>coins</span>
                </div>
                <span
                  aria-label={
                    entry.trend > 0
                      ? `Up ${entry.trend} places`
                      : entry.trend < 0
                        ? `Down ${Math.abs(entry.trend)} places`
                        : "No rank change"
                  }
                  className={`leaderboard-trend ${
                    entry.trend > 0 ? "is-up" : entry.trend < 0 ? "is-down" : "is-steady"
                  }`}
                >
                  {entry.trend > 0 ? "↑" : entry.trend < 0 ? "↓" : "–"}
                  {entry.trend !== 0 && Math.abs(entry.trend)}
                </span>
              </article>
            )
          })}
        </div>
      </section>
    </main>
  )
}

function ProfileToggle({
  checked,
  label,
  onChange,
}: {
  checked: boolean
  label: string
  onChange: () => void
}) {
  return (
    <button
      aria-label={label}
      aria-pressed={checked}
      className={`profile-toggle ${checked ? "is-on" : ""}`}
      onClick={onChange}
      type="button"
    >
      <span aria-hidden="true" />
    </button>
  )
}

function ProfileRow({
  href,
  icon,
  label,
  muted = false,
  showChevron = true,
}: {
  href?: string
  icon: string
  label: string
  muted?: boolean
  showChevron?: boolean
}) {
  const content = (
    <>
      <img alt="" className="profile-row-icon" src={icon} />
      <span>{label}</span>
      {showChevron && (
        <img
          alt=""
          className="profile-row-chevron"
          src={muted ? profileMutedChevron : profileChevron}
        />
      )}
    </>
  )

  return href ? (
    <a
      className={`profile-row ${muted ? "is-muted" : ""}`}
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      {content}
    </a>
  ) : (
    <button className={`profile-row ${muted ? "is-muted" : ""}`} type="button">
      {content}
    </button>
  )
}

function ProfileScreen({
  onBack,
  onOpenAdventures,
  onOpenMap,
  onOpenReferral,
}: {
  onBack: () => void
  onOpenAdventures: () => void
  onOpenMap: () => void
  onOpenReferral: () => void
}) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [locationEnabled, setLocationEnabled] = useState(true)

  return (
    <main className="profile-screen min-h-dvh bg-white text-black">
      <header className="profile-header">
        <button aria-label="Back" onClick={onBack} type="button">
          <img alt="" height="25" src={profileBackIcon} width="25" />
        </button>
        <h1>Profile</h1>
      </header>

      <button className="profile-referral" onClick={onOpenReferral} type="button">
        <span className="profile-referral-icon" aria-hidden="true">
          <svg fill="none" height="25" viewBox="0 0 24 24" width="25">
            <path
              d="M4 10h16v10H4V10Zm-1-4h18v4H3V6Z"
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="1.7"
            />
            <path d="M12 6v14" stroke="currentColor" strokeWidth="1.7" />
            <path
              d="M12 6H8.8C7.25 6 6 4.95 6 3.65 6 2.75 6.82 2 7.82 2 9.75 2 12 6 12 6Zm0 0h3.2C16.75 6 18 4.95 18 3.65 18 2.75 17.18 2 16.18 2 14.25 2 12 6 12 6Z"
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="1.7"
            />
          </svg>
        </span>
        <span className="profile-referral-copy">
          <strong>Refer &amp; Earn</strong>
          <small>Invite a friend and collect rewards</small>
        </span>
        <span className="profile-referral-reward">+100 coins</span>
        <span className="profile-referral-arrow" aria-hidden="true">
          ›
        </span>
      </button>

      <div className="profile-settings">
        <section className="profile-section" aria-labelledby="profile-account-title">
          <h2 id="profile-account-title">Account</h2>
          <ProfileRow
            icon={profileEmailIcon}
            label="rashmikamand17@gmail.com"
            showChevron={false}
          />
        </section>

        <section className="profile-section" aria-labelledby="profile-notifications-title">
          <div className="profile-section-heading">
            <h2 id="profile-notifications-title">Notifications</h2>
            <ProfileToggle
              checked={notificationsEnabled}
              label="Notifications"
              onChange={() => setNotificationsEnabled((enabled) => !enabled)}
            />
          </div>
          <ProfileRow icon={profileBellIcon} label="Manage in system settings" />
        </section>

        <section className="profile-section" aria-labelledby="profile-location-title">
          <div className="profile-section-heading">
            <h2 id="profile-location-title">Location permissions</h2>
            <ProfileToggle
              checked={locationEnabled}
              label="Location permissions"
              onChange={() => setLocationEnabled((enabled) => !enabled)}
            />
          </div>
          <ProfileRow icon={profileLocationIcon} label="Manage in system settings" />
        </section>

        <section className="profile-section" aria-labelledby="profile-support-title">
          <h2 id="profile-support-title">Support &amp; Legal</h2>
          <div className="profile-row-group">
            <ProfileRow icon={profileHelpIcon} label="Help & Support" />
            <ProfileRow
              href="https://tomoboshi.com/terms-of-service/"
              icon={profileTermsIcon}
              label="Terms of Service"
            />
            <ProfileRow
              href="https://tomoboshi.com/privacy-policy-2/"
              icon={profilePrivacyIcon}
              label="Privacy Policy"
            />
          </div>
        </section>

        <section className="profile-section profile-section-other" aria-labelledby="profile-other-title">
          <h2 id="profile-other-title">Other</h2>
          <div className="profile-row-group">
            <ProfileRow icon={profileLogoutIcon} label="Log out" muted />
            <ProfileRow icon={profileDeleteIcon} label="Delete account" muted />
          </div>
        </section>
      </div>

      <nav className="profile-tab-bar" aria-label="Primary">
        <button className="map-nav-item cursor-pointer" onClick={onOpenAdventures} type="button">
          <img alt="" src={adventuresIcon} />
          <span>Adventures</span>
        </button>
        <button className="map-nav-item cursor-pointer" onClick={onOpenMap} type="button">
          <img alt="" src={adventureScreenMapIcon} />
          <span>Map</span>
        </button>
        <button aria-current="page" className="map-nav-item" type="button">
          <img alt="" src={profileActiveIcon} />
          <span>Profile</span>
        </button>
      </nav>
    </main>
  )
}

function ReferralScreen({ onBack }: { onBack: () => void }) {
  const referralCode = "RASH-MAND100"
  const [copied, setCopied] = useState(false)

  const copyReferral = async () => {
    await navigator.clipboard?.writeText(referralCode)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  const shareReferral = async () => {
    const shareData = {
      title: "Join me on Tomoboshi",
      text: `Use my code ${referralCode} on Tomoboshi. Capture your first flag to earn 50 coins, and I’ll earn 100 coins too.`,
      url: window.location.origin,
    }

    if (navigator.share) {
      await navigator.share(shareData)
      return
    }

    await copyReferral()
  }

  return (
    <main className="referral-screen min-h-dvh text-black">
      <header className="referral-header">
        <button aria-label="Back to profile" onClick={onBack} type="button">
          <img alt="" height="25" src={profileBackIcon} width="25" />
        </button>
        <div>
          <p>Invite friends</p>
          <h1>Refer &amp; Earn</h1>
        </div>
      </header>

      <section className="referral-hero" aria-labelledby="referral-hero-title">
        <div className="referral-hero-glow" aria-hidden="true" />
        <div className="referral-gift" aria-hidden="true">
          <svg fill="none" viewBox="0 0 24 24">
            <path
              d="M4 10h16v10H4V10Zm-1-4h18v4H3V6Z"
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="1.6"
            />
            <path d="M12 6v14" stroke="currentColor" strokeWidth="1.6" />
            <path
              d="M12 6H8.8C7.25 6 6 4.95 6 3.65 6 2.75 6.82 2 7.82 2 9.75 2 12 6 12 6Zm0 0h3.2C16.75 6 18 4.95 18 3.65 18 2.75 17.18 2 16.18 2 14.25 2 12 6 12 6Z"
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="1.6"
            />
          </svg>
        </div>
        <p className="referral-eyebrow">Give coins. Get coins.</p>
        <h2 id="referral-hero-title">
          You earn <span>100 coins</span>
          <br />
          They get <span>50 coins</span>
        </h2>
        <p className="referral-hero-description">
          When your friend joins with your invite code and captures their first flag, they receive
          50 coins and you receive 100 coins.
        </p>

        <div className="referral-code-card">
          <div>
            <span>Your invite code</span>
            <strong>{referralCode}</strong>
          </div>
          <button onClick={copyReferral} type="button">
            {copied ? "Copied" : "Copy"}
          </button>
        </div>

        <button className="referral-share" onClick={shareReferral} type="button">
          <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
            <circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="1.8" />
            <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
            <circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="1.8" />
            <path d="m8.7 10.6 6.6-4.1m-6.6 6.9 6.6 4.1" stroke="currentColor" strokeWidth="1.8" />
          </svg>
          Share your invite
        </button>
      </section>

      <section className="referral-progress" aria-labelledby="referral-progress-title">
        <div className="referral-section-heading">
          <div>
            <p>This campaign</p>
            <h2 id="referral-progress-title">Your referral progress</h2>
          </div>
          <span>3 of 5</span>
        </div>
        <div className="referral-progress-track" aria-label="3 of 5 referrals completed">
          <span />
        </div>
        <div className="referral-stats">
          <div>
            <strong>4</strong>
            <span>Invited</span>
          </div>
          <div>
            <strong>3</strong>
            <span>Joined</span>
          </div>
          <div>
            <strong>300</strong>
            <span>Coins earned</span>
          </div>
        </div>
      </section>

      <section className="referral-how" aria-labelledby="referral-how-title">
        <div className="referral-section-heading">
          <div>
            <p>Three simple steps</p>
            <h2 id="referral-how-title">How it works</h2>
          </div>
        </div>
        <ol>
          <li>
            <span>1</span>
            <div>
              <h3>Send your invitation</h3>
              <p>Share your personal code or invite link with a friend.</p>
            </div>
          </li>
          <li>
            <span>2</span>
            <div>
              <h3>They start exploring</h3>
              <p>
                Your friend signs up with code RASH-MAND100 and starts their first adventure.
              </p>
            </div>
          </li>
          <li>
            <span>3</span>
            <div>
              <h3>You both get rewarded</h3>
              <p>
                As soon as they capture their first flag, they receive 50 coins and you receive
                100 coins.
              </p>
            </div>
          </li>
        </ol>
      </section>

      <section className="referral-activity" aria-labelledby="referral-activity-title">
        <div className="referral-section-heading">
          <div>
            <p>Invite status</p>
            <h2 id="referral-activity-title">Recent referrals</h2>
          </div>
          <span>View all</span>
        </div>
        <div className="referral-activity-list">
          <article>
            <span className="referral-person referral-person-one">JM</span>
            <div>
              <h3>Jamie M.</h3>
              <p>First flag captured</p>
            </div>
            <strong className="is-earned">+100</strong>
          </article>
          <article>
            <span className="referral-person referral-person-two">SK</span>
            <div>
              <h3>Sam K.</h3>
              <p>Joined · 1 step remaining</p>
            </div>
            <strong className="is-pending">Pending</strong>
          </article>
          <article>
            <span className="referral-person referral-person-three">RL</span>
            <div>
              <h3>Riley L.</h3>
              <p>Invitation sent 2 days ago</p>
            </div>
            <strong className="is-invited">Invited</strong>
          </article>
        </div>
      </section>

      <section className="referral-faq" aria-labelledby="referral-faq-title">
        <div className="referral-section-heading">
          <div>
            <p>Good to know</p>
            <h2 id="referral-faq-title">Questions &amp; details</h2>
          </div>
        </div>
        <details>
          <summary>When will my coins arrive?</summary>
          <p>
            Your 100 coins and your friend’s 50 coins are added automatically after they capture
            their first flag using your referral.
          </p>
        </details>
        <details>
          <summary>Who can I invite?</summary>
          <p>
            Invite friends who are new to Tomoboshi and have not previously created an account.
          </p>
        </details>
        <details>
          <summary>Is there an invite limit?</summary>
          <p>
            This campaign rewards up to five qualifying friends. You can still invite more people
            after reaching the reward limit.
          </p>
        </details>
      </section>

      <p className="referral-terms">
        Rewards are promotional, have no cash value, and may take up to 24 hours to appear.
        Invitations must qualify within 30 days.
      </p>
    </main>
  )
}

function CaptureSheet({
  onCapture,
  onDismiss,
  rewardVariant,
}: {
  onCapture: () => void
  onDismiss: () => void
  rewardVariant: number
}) {
  return (
    <div className="fixed inset-0 z-30">
      <button
        aria-label="Close capture details"
        className="absolute inset-0 cursor-default bg-transparent"
        onClick={onDismiss}
        type="button"
      />
      <section
        aria-labelledby="capture-title"
        aria-modal="true"
        className="capture-sheet absolute inset-x-0 bottom-0 h-[300px] overflow-hidden rounded-t-[30px] border-t border-white/50 bg-white/95 backdrop-blur-[5px]"
        role="dialog"
      >
        <img
          alt=""
          className="absolute left-1/2 top-px h-5 w-[175px] -translate-x-1/2"
          src={sheetHandle}
        />

        <div className="absolute left-[21px] top-[30px]">
          <h1
            className="font-['Inter:Bold'] text-[20px] leading-7 font-bold text-black"
            id="capture-title"
          >
            Gold Name
          </h1>
          <p className="font-['Inter:Regular'] mt-px text-[13px] leading-normal text-black/60">
            0.2 mi • Gold Flag
          </p>
        </div>

        <div className="absolute right-3 top-[30px]">
          <RewardPill
            coins={50}
            key={rewardVariant}
            showPlus={false}
            variant={rewardVariant}
          />
        </div>

        <button
          className="absolute top-[186px] right-3 left-3 flex h-[47px] cursor-pointer items-center justify-center rounded-[40px] border-[0.5px] border-white/5 bg-black font-['Inter:Bold'] text-[23px] leading-normal font-bold tracking-[0.92px] text-[#f5c542] shadow-[inset_0_-2px_4px_rgba(0,0,0,0.2),inset_0_2px_4px_rgba(255,255,255,0.4),0_4px_35px_rgba(0,0,0,0.25)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5c542]"
          onClick={onCapture}
          type="button"
        >
          Capture
        </button>
      </section>
    </div>
  )
}

export default function App() {
  const [screen, setScreen] = useState<
    "map" | "adventures" | "leaderboard" | "profile" | "referral"
  >("map")
  const [profileReturnScreen, setProfileReturnScreen] = useState<"map" | "adventures">("map")
  const [captureSheetOpen, setCaptureSheetOpen] = useState(false)
  const [captured, setCaptured] = useState(false)
  const [rewardVariant, setRewardVariant] = useState(0)

  const handleCapture = () => {
    setCaptureSheetOpen(false)
    setCaptured(true)
  }

  const openProfile = (from: "map" | "adventures") => {
    setProfileReturnScreen(from)
    setScreen("profile")
  }

  return (
    <>
      {screen === "map" ? (
        <MapScreen
          onOpenAdventures={() => setScreen("adventures")}
          onOpenCapture={() => setCaptureSheetOpen(true)}
          onOpenProfile={() => openProfile("map")}
        />
      ) : screen === "adventures" ? (
        <AdventureScreen
          onOpenLeaderboard={() => setScreen("leaderboard")}
          onOpenMap={() => setScreen("map")}
          onOpenProfile={() => openProfile("adventures")}
        />
      ) : screen === "leaderboard" ? (
        <LeaderboardScreen onBack={() => setScreen("adventures")} />
      ) : screen === "profile" ? (
        <ProfileScreen
          onBack={() => setScreen(profileReturnScreen)}
          onOpenAdventures={() => setScreen("adventures")}
          onOpenMap={() => setScreen("map")}
          onOpenReferral={() => setScreen("referral")}
        />
      ) : (
        <ReferralScreen onBack={() => setScreen("profile")} />
      )}
      {captureSheetOpen && (
        <CaptureSheet
          onCapture={handleCapture}
          onDismiss={() => setCaptureSheetOpen(false)}
          rewardVariant={rewardVariant}
        />
      )}
      {captured && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
          <button
            aria-label="Dismiss capture success"
            className="absolute inset-0 cursor-default bg-transparent"
            onClick={() => setCaptured(false)}
            type="button"
          />
          <CoinBurst />
          <CaptureWidget rewardVariant={rewardVariant} />
        </div>
      )}
      {screen === "map" && (
        <div className="demo-variant-nav" aria-label="Reward style demo controls">
          <button
            aria-label="Previous reward style"
            className="demo-variant-arrow demo-variant-arrow-left"
            onClick={() =>
              setRewardVariant(
                (rewardVariant - 1 + rewardVariants.length) %
                  rewardVariants.length,
              )
            }
            type="button"
          >
            ‹
          </button>
          <div className="demo-variant-label" aria-live="polite">
            <span>{rewardVariants[rewardVariant]}</span>
            <span>
              {rewardVariant + 1}/{rewardVariants.length}
            </span>
          </div>
          <button
            aria-label="Next reward style"
            className="demo-variant-arrow demo-variant-arrow-right"
            onClick={() =>
              setRewardVariant((rewardVariant + 1) % rewardVariants.length)
            }
            type="button"
          >
            ›
          </button>
        </div>
      )}
    </>
  )
}
