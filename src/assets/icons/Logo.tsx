import * as React from "react";

function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 169 77" fill="none" {...props}>
      <path fill="url(#prefix__pattern0)" d="M0 0h169v77H0z" />
      <defs>
        <pattern
          id="prefix__pattern0"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}
        >
          <use xlinkHref="#prefix__image0" transform="scale(.00592 .01299)" />
        </pattern>
        <image
          id="prefix__image0"
          width={169}
          height={77}
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKkAAABNCAYAAADdAES7AAAACXBIWXMAAAsTAAALEwEAmpwYAAAF+mlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIxLTA1LTA2VDE0OjM1OjU5KzA1OjMwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMS0wNS0wNlQxNDozNjozNyswNTozMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMS0wNS0wNlQxNDozNjozNyswNTozMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyMzdiNDg4Yy1mYzgwLTBlNGItOTc2MS0wN2E3ZDU1NmFkOTQiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo0YzQ4OGQ4OC0wMzI3LTNjNGEtOTIwMS0xNmM2MWQ5MmRjMzYiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDplYzI5Y2ZlZi03MTNhLTYzNDgtYTIwOC1mMGYxOGZiMjMwOGMiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmVjMjljZmVmLTcxM2EtNjM0OC1hMjA4LWYwZjE4ZmIyMzA4YyIgc3RFdnQ6d2hlbj0iMjAyMS0wNS0wNlQxNDozNTo1OSswNTozMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDoyMzdiNDg4Yy1mYzgwLTBlNGItOTc2MS0wN2E3ZDU1NmFkOTQiIHN0RXZ0OndoZW49IjIwMjEtMDUtMDZUMTQ6MzY6MzcrMDU6MzAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE4IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4yiFowAAALM0lEQVR4nO2dfYweRR3HP23xgAPklBM9kIBWoWo9rHJRq0LM+dJ4RiFiGk00KdJQMcWGYJSERAxEiBowiAlJidCAEYnWBgIRrCYIVASh3ClakFqxgJS2cuCVa6+9+/rHzPrMM8/s2z0vt3c3n2Tz7M7+Zua3u9+dnbfdZ4EkIpEqs3CmHYhE8ogijVSeKNJI5YkijVSeKNJI5YkijVSeKNJI5YkijVSeKNJI5YkijVSeKNJI5YkijVSeKNLi9ALLZtqJ+UgUaT7d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"
        />
      </defs>
    </svg>
  );
}

const MemoLogo = React.memo(Logo);
export default MemoLogo;
