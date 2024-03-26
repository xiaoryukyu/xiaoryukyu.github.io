import { ArcGisMapServerImageryProvider, ImageryLayer, Viewer, Cesium3DTileset,Ion ,Cesium3DTileStyle,defined} from 'cesium';
import './index.css';
Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhZWU4NzMxNC01MzIwLTRlMDYtYTZlMy1lNDgwNmU4NzFjOTEiLCJpZCI6MjAzOTcxLCJpYXQiOjE3MTExOTk2MjZ9.qKHjuR9-tie4eP4IvN1JJoPGC0KV0iuCakuQKXF8704";

const viewer = new Viewer('cesiumContainer', {
  baseLayer: ImageryLayer.fromProviderAsync(ArcGisMapServerImageryProvider.fromUrl('https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer', {
    enablePickFeatures: false
  }), {}),
  baseLayerPicker: false,
  animation: false,
  fullscreenButton: false,
  geocoder: false,
  homeButton: false,
  selectionIndicator: true,
  timeline: false,
  navigationHelpButton: false,
  shouldAnimate: true,
  useBrowserRecommendedResolution: false,
  orderIndependentTranslucency: false,
});

async function loadTileset() {
  try {
    const tileset = await Cesium3DTileset.fromIonAssetId(2514367);
    viewer.scene.primitives.add(tileset);
    await viewer.zoomTo(tileset);

    // Check if the tileset has default style defined in its extras
    const extras = tileset.asset.extras;
    if (defined(extras) && defined(extras.ion) && defined(extras.ion.defaultStyle)) {
      // Apply the default style from extras
      tileset.style = new Cesium3DTileStyle(extras.ion.defaultStyle);
    }

    // Regardless of whether a default style was applied, set a custom point size
    // Ensure there's a style object to modify
    if (!defined(tileset.style)) {
      tileset.style = new Cesium3DTileStyle();
    }
    tileset.style.pointSize = 3;

  } catch (error) {
    console.error(`Error loading tileset: ${error}`);
  }
}

loadTileset();