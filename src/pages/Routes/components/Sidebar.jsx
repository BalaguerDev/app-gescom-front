// src/components/routes/Sidebar.jsx
import React from "react";
import RouteSummary from "./RouteSummary";
import RouteClientList from "./RouteClientList";

export default function Sidebar({ route, onSelect }) {
  return (
    <div className="w-[340px] bg-gray-50 h-full border-r flex flex-col">
      {route && (
        <>
          <RouteSummary route={route} />
          <RouteClientList
            clients={route.stops.map(s => s.client)}
            stops={route.stops}
            onSelect={onSelect}
          />
        </>
      )}
    </div>
  );
}
