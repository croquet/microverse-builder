# Changelog

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 2022-04-29
### Added
- The follow button has participant count readout.
- The follow feature works also when the leader goes to the birds eye view.
- Avatars translucency adjustment when following or being seen through a portal.
- The Rapier-based physics simulation. (rapier.js and collider.js)
- The prototype version of portals.
- Save an individual card into a file.

### Changed
- 3D events that event handler receives has the "xy" property that is in the display coordinates.
- Spin behavior uses xy to spin an object a bit more smoothly.

## 2022-05-6
### Added
- A new layer called "portal".
- A way to create a new card with Sticky Note.

### Changed
- The default value for multiuser flag is now true.
- The behaviors of an exported card are detatched from the file editing.
- Instead of "_" change event names, use the property name + "Set" for change event names.

### Fixed
- Memory Leak in Rapier.js.
- Saving a card only save the file for the initiating user.
- Movement after coming back from dormancy.

### Pending
- Avatar collision with walls.
- Numerous improvements to the Portals.

