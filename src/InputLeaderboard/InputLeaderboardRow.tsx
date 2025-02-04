import React from "react";
import { Link } from "react-router-dom";

import type { SubmissionWithRank } from "src/InputLeaderboard/Types";

type InputLeaderboardRowProps = SubmissionWithRank;

function InputLeaderboardRow(props: InputLeaderboardRowProps) {
  return (
    <tr>
      <th>{props.rank}</th>
      <td>
        <span className="team-link">
          <Link to={`/team/${encodeURIComponent(props.teamName)}`}>{props.teamName}</Link>
        </span>
      </td>
      <td>{props.penaltyStr}</td>
    </tr>
  );
}

export { InputLeaderboardRow };
