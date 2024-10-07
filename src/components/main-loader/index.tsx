import { memo } from "react";

const MainLoader = memo(function MainLoader() {
  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <div className="flex">
        <h2 className="animate-bounce delay-100 text-5xl sm:text-9xl">A</h2>
        <h2 className="animate-bounce delay-300 text-5xl sm:text-9xl">D</h2>
        <h2 className="animate-bounce delay-600 text-5xl sm:text-9xl">O</h2>
        <h2 className="animate-bounce delay-200 text-5xl sm:text-9xl">R</h2>
        <h2 className="animate-bounce delay-100 text-5xl sm:text-9xl">E</h2>
      </div>
      <img
        src="/adore-logo.png"
        className="h-[140px] w-[180px] sm:h-[270px] sm:w-[450px]"
      />
    </div>
  );
});

export default MainLoader;

// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import {
//   createContext,
//   memo,
//   useCallback,
//   useContext,
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
//   type ReactNode,
// } from "react";
// import {
//   BackHandler,
//   Platform,
//   StatusBar,
//   View,
//   type ImageStyle,
//   TouchableWithoutFeedback,
//   StyleSheet,
//   useWindowDimensions,
// } from "react-native";
// import { Image, type ImageLoadEventData } from "expo-image";
// import { GestureDetector, Gesture } from "react-native-gesture-handler";
// import { Text } from "react-native-paper";
// import Animated, {
//   runOnJS,
//   Easing,
//   cancelAnimation,
//   useAnimatedStyle,
//   useDerivedValue,
//   useSharedValue,
//   withDecay,
//   withTiming,
// } from "react-native-reanimated";

// //   import BadgedIcon from 'components/BadgedIcon';
// //   import Spinner from 'components/Spinner';

// // import { Image, type ImageLoadEventData } from 'expo-image';
// //   import DownloadButton, { TDownloadButtonApi } from './DownloadPhotoButton';

// const BASE_URL = "https://the-masjid-app.sfo2.digitaloceanspaces.com";
// const IMG_URL =
//   "https://images.unsplash.com/photo-1720727226875-44a17a151320?q=80&w=2815&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
// type TZoomablePhotoOverlayApi = {
//   // mount: (source: string) => void;
//   // unmount: (source: string) => void;
//   zoom: (inputs: { source: string }) => void;
//   unzoom: () => void;
// };

// const ZoomablePhotoOverlayContext = createContext<
//   TZoomablePhotoOverlayApi | undefined
// >(undefined);

// type TZoomablePhotoOverlayProviderProps = {
//   children: ReactNode;
// };

// export const ZoomablePhotoOverlayProvider =
//   function ZoomablePhotoOverlayProvider(
//     props: TZoomablePhotoOverlayProviderProps
//   ) {
//     const [photo, setPhoto] = useState<string | null>(null);

//     useEffect(function hideImageModelWhenUnMount() {
//       return () => {
//         setPhoto(null);
//       };
//     }, []);

//     const downloadButton = useRef<any>(null);

//     const api = useMemo(() => {
//       const zoom: TZoomablePhotoOverlayApi["zoom"] = function zoom(inputs) {
//         StatusBar.setHidden(true, "fade");

//         if (Platform.OS === "android") {
//           // unzoom on hardware back
//           BackHandler.addEventListener(
//             "hardwareBackPress",
//             unzoomOnHardwareBack
//           );
//           setPhoto(null);
//         }
//         setPhoto(inputs.source);
//         downloadButton.current?.show();
//       };

//       const unzoom: TZoomablePhotoOverlayApi["unzoom"] = function unzoom() {
//         StatusBar.setHidden(false, "fade");
//         BackHandler.removeEventListener(
//           "hardwareBackPress",
//           unzoomOnHardwareBack
//         );

//         setPhoto(null);
//         // downloadButton.current?.hide();
//       };

//       const unzoomOnHardwareBack = function unzoomOnHardwareBack() {
//         unzoom();
//         // Return true to block the navigator from going back.
//         return true;
//       };

//       return {
//         zoom,
//         unzoom,
//       };
//     }, [setPhoto, downloadButton]);

//     const overlayStyle = useMemo(
//       () =>
//         ({
//           ...StyleSheet.absoluteFillObject,
//           justifyContent: "center",
//           alignItems: "center",
//           backgroundColor: "rgba(0,0,0,0.85)",
//         } as const),
//       []
//     );

//     const closeModalWithTap = useMemo(
//       function getCloseModalWithTap() {
//         return Gesture.Tap().onStart(function closePopUpWithBackgroundTap() {
//           runOnJS(api.unzoom)();
//         });
//       },
//       [api.unzoom]
//     );
//     console.log("ref", downloadButton.current);

//     const blockTapsOnImage = useMemo(function getBlockTapsOnImage() {
//       return Gesture.Tap().numberOfTaps(1);
//     }, []);

//     return (
//       <ZoomablePhotoOverlayContext.Provider value={api}>
//         {props.children}

//         {!!photo && (
//           <GestureDetector gesture={closeModalWithTap}>
//             <View style={overlayStyle}>
//               <GestureDetector gesture={blockTapsOnImage}>
//                 <ZoomableImage image={`${photo}`} />
//                 {/* <ZoomableImage image={`${BASE_URL}/${photo}`} /> */}
//               </GestureDetector>
//               <Text>Download later</Text>
//               {/* <DownloadButton
//                 ref={downloadButton}
//                 latestPhotos={`${BASE_URL}/${photo}`}
//               /> */}
//             </View>
//           </GestureDetector>
//         )}
//       </ZoomablePhotoOverlayContext.Provider>
//     );
//   };

// // resizeMode is always contain
// export type TZoomablePhotoProps = {
//   photo: string;
//   autoHeight: boolean;
//   style: ImageStyle &
//     NonNullable<
//       { width: number } | { height: number } | { width: number; height: number }
//     >;
// };

// const ZoomablePhoto = memo(function ZoomablePhoto(props: TZoomablePhotoProps) {
//   const context = useContext(ZoomablePhotoOverlayContext);
//   if (context === undefined) {
//     //   return null;
//     throw new Error(
//       "useZoomablePhotoOverlay must be used within a ZoomablePhotoOverlayProvider"
//     );
//   }

//   const [state, setState] = useState<
//     | {
//         status: "loading" | "error";
//       }
//     | {
//         status: "loaded";
//         naturalWidth: number;
//         naturalHeight: number;
//       }
//   >({ status: "loading" });

//   // if props.autoHeight
//   // if not yet loaded, watch for status.loaded
//   // after loaded, then watch for props_style_width
//   let heightCacheKey;
//   if (props.autoHeight) {
//     if (state.status === "loaded") {
//       heightCacheKey = props?.style?.width;
//     } else {
//       heightCacheKey = state.status;
//     }
//   } else {
//     if (state.status === "loaded") {
//       heightCacheKey = props?.style?.height;
//     } else {
//       heightCacheKey = null;
//     }
//   }

//   const imageAndIconContainerStyle = useMemo(() => {
//     let height;
//     if (props.autoHeight && state.status === "loaded") {
//       const ratio = props?.style?.width / state.naturalWidth;
//       height = state.naturalHeight * ratio;
//     } else {
//       height = props?.style?.height;
//     }

//     return {
//       width: props?.style?.width,
//       height,
//       justifyContent: "center",
//       alignItems: "center",
//     } as const;
//   }, [
//     props?.autoHeight,
//     props?.style?.width,
//     props?.style?.height,
//     state.status,
//     state.naturalWidth,
//     state.naturalHeight,
//   ]);

//   const photoStyle = useMemo(
//     () => ({
//       ...props?.style,
//       width: imageAndIconContainerStyle.width,
//       height: imageAndIconContainerStyle.height,
//     }),
//     [
//       props?.style,
//       imageAndIconContainerStyle.width,
//       imageAndIconContainerStyle.height,
//     ]
//   );

//   const zoom = useCallback(() => {
//     context?.zoom({
//       source: props.photo,
//     });
//   }, [context?.zoom, props.photo]);

//   return (
//     <View style={imageAndIconContainerStyle}>
//       <View>
//         <Text> {state.status === "loading" && "loading...."}</Text>
//         {/* {state.status === 'loading' && <Spinner dots={3} size={18} />} */}
//         {state.status === "error" && (
//           <MaterialCommunityIcons name="close" color={"red"} />
//         )}

//         {
//           <TouchableWithoutFeedback onPress={zoom}>
//             <Image
//               {...props}
//               style={photoStyle}
//               source={{
//                 uri: props.photo,
//               }}
//               //   source={props.photo}
//               onLoad={useCallback(function getImageSizeOnLoad(
//                 event: ImageLoadEventData
//               ) {
//                 console.log("events", event?.source);

//                 setState({
//                   status: "loaded",
//                   naturalHeight: event?.source?.height,
//                   naturalWidth: event?.source?.width,
//                 });
//               },
//               [])}
//             />
//           </TouchableWithoutFeedback>
//         }
//       </View>
//     </View>
//   );
// });

// type TPinchTransformProps = {
//   toScale: number;
//   fromScale: number;
//   origin: { x: number; y: number };
//   delta: { x: number; y: number };
//   offset: { x: number; y: number };
// };

// type TZoomableImageProps = { image: string };

// function ZoomableImage(props: TZoomableImageProps) {
//   const config = { duration: 300, easing: Easing.linear };

//   function pinchTransform(props: TPinchTransformProps) {
//     "worklet";

//     const fromPinchX = -1 * (props.origin.x * props.fromScale - props.origin.x);
//     const fromPinchY = -1 * (props.origin.y * props.fromScale - props.origin.y);
//     const toPinchX = -1 * (props.origin.x * props.toScale - props.origin.x);
//     const toPinchY = -1 * (props.origin.y * props.toScale - props.origin.y);

//     const x = props.offset.x + toPinchX - fromPinchX + props.delta.x;
//     const y = props.offset.y + toPinchY - fromPinchY + props.delta.y;
//     return { x, y };
//   }

//   function clamp(lowerBound: number, upperBound: number, value: number) {
//     "worklet";
//     return Math.max(lowerBound, Math.min(value, upperBound));
//   }

//   function friction(fraction: number) {
//     "worklet";
//     return 0.75 * Math.pow(1 - fraction * fraction, 2);
//   }
//   const ExpoAnimatedImage = Animated.createAnimatedComponent(Image);

//   const { width, height } = useWindowDimensions();

//   const imageWidth = useSharedValue<number>(1);
//   const imageHeight = useSharedValue<number>(1);

//   const scale = useSharedValue<number>(1);
//   const scaleOffset = useSharedValue<number>(1);

//   const translateX = useSharedValue<number>(0);
//   const translateY = useSharedValue<number>(0);
//   const translateXOffset = useSharedValue<number>(0);
//   const translateYOffset = useSharedValue<number>(0);

//   const originX = useSharedValue<number>(0);
//   const originY = useSharedValue<number>(0);

//   const isPinchActive = useSharedValue<boolean>(false);

//   const isWithinBoundX = useSharedValue<boolean>(true);
//   const isWithinBoundY = useSharedValue<boolean>(true);

//   const boundaries = useDerivedValue(
//     function boundaries() {
//       const offsetX = Math.max(0, imageWidth.value * scale.value - width) / 2;
//       const offsetY = Math.max(0, imageHeight.value * scale.value - height) / 2;

//       return { x: offsetX, y: offsetY };
//     },
//     [scale, imageWidth, imageHeight, width, height]
//   );

//   const zoomImageOnPinch = useMemo(
//     function getZoomImageOnPinch() {
//       return Gesture.Pinch()
//         .onStart(function zoomImageOnPinchStart(e) {
//           isPinchActive.value = true;
//           originX.value = e.focalX - imageWidth.value / 2;
//           originY.value = e.focalY - imageHeight.value / 2;

//           translateXOffset.value = translateX.value;
//           translateYOffset.value = translateY.value;
//           scaleOffset.value = scale.value;
//         })
//         .onUpdate(function zoomImageOnPinchUpdate(e) {
//           const toScale = e.scale * scaleOffset.value;
//           const deltaX = e.focalX - imageWidth.value / 2 - originX.value;
//           const deltaY = e.focalY - imageHeight.value / 2 - originY.value;

//           const { x: toX, y: toY } = pinchTransform({
//             toScale: toScale,
//             fromScale: scaleOffset.value,
//             origin: { x: originX.value, y: originY.value },
//             offset: { x: translateXOffset.value, y: translateYOffset.value },
//             delta: { x: deltaX, y: deltaY },
//           });

//           const boundX = Math.max(0, imageWidth.value * toScale - width) / 2;
//           const boundY = Math.max(0, imageHeight.value * toScale - height) / 2;

//           translateX.value = clamp(-1 * boundX, boundX, toX);
//           translateY.value = clamp(-1 * boundY, boundY, toY);
//           scale.value = toScale;
//         })
//         .onEnd(function zoomImageOnPinchEnd() {
//           isPinchActive.value = false;

//           if (scale.value < 1) {
//             scale.value = withTiming(1);
//             translateX.value = withTiming(0);
//             translateY.value = withTiming(0);
//           }
//         });
//     },
//     [
//       height,
//       imageHeight,
//       imageWidth,
//       isPinchActive,
//       originX,
//       originY,
//       scale,
//       scaleOffset,
//       translateX,
//       translateXOffset,
//       translateY,
//       translateYOffset,
//       width,
//     ]
//   );

//   const dragImageOnPan = useMemo(
//     function getDragImageOnPan() {
//       return Gesture.Pan()
//         .maxPointers(1)
//         .onStart(function dragZoomImageOnStart() {
//           cancelAnimation(translateX);
//           cancelAnimation(translateY);

//           translateXOffset.value = translateX.value;
//           translateYOffset.value = translateY.value;
//         })
//         .onChange(function dragZoomImageOnChange(e) {
//           const toX = translateXOffset.value + e.translationX;
//           const toY = translateYOffset.value + e.translationY;

//           const { x: boundX, y: boundY } = boundaries.value;
//           isWithinBoundX.value = toX >= -1 * boundX && toX <= boundX;
//           isWithinBoundY.value = toY >= -1 * boundY && toY <= boundY;

//           if (isWithinBoundX.value) {
//             translateX.value = clamp(-1 * boundX, boundX, toX);
//           } else {
//             if (imageWidth.value * scale.value < width) {
//               translateX.value = clamp(-1 * boundX, boundX, toX);
//             } else {
//               const fraction = (Math.abs(toX) - boundX) / width;
//               const frictionX = friction(clamp(0, 1, fraction));
//               translateX.value += e.changeX * frictionX;
//             }
//           }

//           if (isWithinBoundY.value) {
//             translateY.value = clamp(-1 * boundY, boundY, toY);
//           } else {
//             if (imageHeight.value * scale.value < height) {
//               translateY.value = clamp(-1 * boundY, boundY, toY);
//             } else {
//               const fraction = (Math.abs(toY) - boundY) / width;
//               const frictionY = friction(clamp(0, 1, fraction));
//               translateY.value += e.changeY * frictionY;
//             }
//           }
//         })
//         .onEnd(function dragZoomImageOnEnd(e) {
//           const { x: boundX, y: boundY } = boundaries.value;
//           const toX = clamp(-1 * boundX, boundX, translateX.value);
//           const toY = clamp(-1 * boundY, boundY, translateY.value);

//           translateX.value = isWithinBoundX.value
//             ? withDecay({
//                 velocity: e.velocityX / 2,
//                 clamp: [-1 * boundX, boundX],
//               })
//             : withTiming(toX, config);

//           translateY.value = isWithinBoundY.value
//             ? withDecay({
//                 velocity: e.velocityY / 2,
//                 clamp: [-1 * boundY, boundY],
//               })
//             : withTiming(toY, config);
//         });
//     },
//     [
//       boundaries,
//       height,
//       imageHeight,
//       imageWidth,
//       isWithinBoundX,
//       isWithinBoundY,
//       scale,
//       translateX,
//       translateXOffset,
//       translateY,
//       translateYOffset,
//       width,
//     ]
//   );

//   const zoomImageOnDoubleTap = useMemo(
//     function getZoomImageWithDoubleTap() {
//       return Gesture.Tap()
//         .numberOfTaps(2)
//         .maxDuration(250)
//         .onStart(function doubleTapImageOnStart() {
//           translateXOffset.value = translateX.value;
//           translateYOffset.value = translateY.value;
//         })
//         .onEnd(function doubleTapImageOnEnd(e) {
//           if (isPinchActive.value) {
//             return;
//           }

//           if (scale.value > 2) {
//             translateX.value = withTiming(0);
//             translateY.value = withTiming(0);
//             scale.value = withTiming(1);
//             return;
//           }

//           const orgnX = e.x - imageWidth.value / 2;
//           const orgnY = e.y - imageHeight.value / 2;
//           const highestScreenDimension = Math.max(width, height);
//           const highestImageDimension = Math.max(
//             imageWidth.value,
//             imageHeight.value
//           );

//           const tapOrigin = width > height ? orgnX : orgnY;
//           const toScale =
//             ((highestScreenDimension + Math.abs(tapOrigin)) /
//               highestImageDimension) *
//             4;

//           const { x, y } = pinchTransform({
//             fromScale: scale.value,
//             toScale,
//             origin: { x: orgnX, y: orgnY },
//             offset: { x: translateXOffset.value, y: translateYOffset.value },
//             delta: { x: 0, y: 0 },
//           });

//           const boundX = Math.max(0, (imageWidth.value * toScale - width) / 2);
//           const boundY = Math.max(
//             0,
//             (imageHeight.value * toScale - height) / 2
//           );

//           translateX.value = withTiming(clamp(-boundX, boundX, x));
//           translateY.value = withTiming(clamp(-boundY, boundY, y));
//           scale.value = withTiming(toScale);
//         });
//     },
//     [
//       height,
//       imageHeight,
//       imageWidth,
//       isPinchActive,
//       scale,
//       translateX,
//       translateXOffset,
//       translateY,
//       translateYOffset,
//       width,
//     ]
//   );

//   const zoomableImageStyle = useAnimatedStyle(
//     function getAnimatedPhotoStyle() {
//       return {
//         width: imageWidth.value,
//         height: imageHeight.value,
//         transform: [
//           { translateX: translateX.value },
//           { translateY: translateY.value },
//           {
//             scale: scale.value,
//           },
//         ],
//       };
//     },
//     [scale, imageHeight, imageWidth, translateX, translateY]
//   );

//   return (
//     <GestureDetector
//       gesture={Gesture.Race(
//         dragImageOnPan,
//         zoomImageOnPinch,
//         zoomImageOnDoubleTap
//       )}
//     >
//       <ExpoAnimatedImage
//         // contentFit={'contain'}
//         style={zoomableImageStyle}
//         // source={props.image}
//         source={{ uri: props.image }}
//         onLoad={useCallback(
//           function getImageSizeOnLoad(event: ImageLoadEventData) {
//             const loadedImageHeight = event?.source?.height;
//             const loadedImageWidth = event?.source?.width;

//             const isPortrait = width < height;
//             const aspectRatio = loadedImageWidth / loadedImageHeight;
//             if (isPortrait) {
//               imageWidth.value = withTiming(width, {
//                 duration: 300,
//                 easing: Easing.bezier(0.62, 0.29, 0.15, 3.05),
//               });
//               imageHeight.value = withTiming(width / aspectRatio, {
//                 duration: 300,
//                 easing: Easing.bezier(0.62, 0.29, 0.15, 3.05),
//               });
//             } else {
//               imageWidth.value = height * aspectRatio;
//               imageHeight.value = height;
//             }
//             scale.value = withTiming(1, config);
//             translateX.value = withTiming(0, config);
//             translateY.value = withTiming(0, config);
//           },
//           [
//             scale,
//             translateX,
//             translateY,
//             height,
//             width,
//             imageHeight,
//             imageWidth,
//           ]
//         )}
//       />
//     </GestureDetector>
//   );
// }

// export default ZoomablePhoto;
