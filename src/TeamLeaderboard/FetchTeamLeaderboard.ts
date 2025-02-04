import { ParseSize, ParseInputID } from "src/Types";
import type { LeaderboardRank } from "src/TeamLeaderboard/Types";

declare interface FetchTeamLeaderboardResponse {
  Entries: {
    TeamScore: number;
    TeamScoreStr: string;
    TeamRank: number;
    TestCase: {
      CaseType: string;
      CaseID: number;
    };
  }[];
}

async function FetchTeamLeaderboard(
  teamName: string
): Promise<LeaderboardRank[]> {
  const result = await fetch(
    `https://project.cs170.dev/team/${encodeURIComponent(teamName)}/`
  );
  const parsed: FetchTeamLeaderboardResponse = await result.json();

  const ranks = parsed.Entries.map((item) => {
    const size = ParseSize(item.TestCase.CaseType);
    const input = ParseInputID(item.TestCase.CaseID);

    // TODO(tylerhou): Error if size and input don't parse.
    return {
      rank: item.TeamRank,
      penalty: item.TeamScore,
      penaltyStr: item.TeamScoreStr,
      size: size!,
      input: input!,
    };
  });

  return ranks;
}

export { FetchTeamLeaderboard };
