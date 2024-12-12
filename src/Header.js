import { Button } from "@mui/material";

export default function Header({state, dispatch}) {
  return <div className="header">
  <span className=""></span>
  <span className="header-actions-container">
    <span className="header-action download"></span>
    <span className="header-action change-orientation"></span>
    <span className="header-action tint-background">
      <Button variant="contained" onClick={() => dispatch({ type: "tint", payload: { tint: !state.tint }})}>Tint Background</Button>
    </span>
    <span className="header-action font-white-or-black"></span>
    <span className="header-action hide-all-actions">
      <Button variant="contained" onClick={() => dispatch({ type: "hideActions", payload: { hideActions: !state.hideActions }})}>{state.hideActions ? "Show" : "Hide"} Actions</Button>
    </span>
  </span>
</div>
}