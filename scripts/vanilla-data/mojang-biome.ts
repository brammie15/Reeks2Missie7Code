/**
 * All possible MinecraftBiomeTypes
 */
export enum MinecraftBiomeTypes {
  BambooJungle = "minecraft:bamboo_jungle",
  BambooJungleHills = "minecraft:bamboo_jungle_hills",
  BasaltDeltas = "minecraft:basalt_deltas",
  Beach = "minecraft:beach",
  BirchForest = "minecraft:birch_forest",
  BirchForestHills = "minecraft:birch_forest_hills",
  BirchForestHillsMutated = "minecraft:birch_forest_hills_mutated",
  BirchForestMutated = "minecraft:birch_forest_mutated",
  CherryGrove = "minecraft:cherry_grove",
  ColdBeach = "minecraft:cold_beach",
  ColdOcean = "minecraft:cold_ocean",
  ColdTaiga = "minecraft:cold_taiga",
  ColdTaigaHills = "minecraft:cold_taiga_hills",
  ColdTaigaMutated = "minecraft:cold_taiga_mutated",
  CrimsonForest = "minecraft:crimson_forest",
  DeepColdOcean = "minecraft:deep_cold_ocean",
  DeepDark = "minecraft:deep_dark",
  DeepFrozenOcean = "minecraft:deep_frozen_ocean",
  DeepLukewarmOcean = "minecraft:deep_lukewarm_ocean",
  DeepOcean = "minecraft:deep_ocean",
  DeepWarmOcean = "minecraft:deep_warm_ocean",
  Desert = "minecraft:desert",
  DesertHills = "minecraft:desert_hills",
  DesertMutated = "minecraft:desert_mutated",
  DripstoneCaves = "minecraft:dripstone_caves",
  ExtremeHills = "minecraft:extreme_hills",
  ExtremeHillsEdge = "minecraft:extreme_hills_edge",
  ExtremeHillsMutated = "minecraft:extreme_hills_mutated",
  ExtremeHillsPlusTrees = "minecraft:extreme_hills_plus_trees",
  ExtremeHillsPlusTreesMutated = "minecraft:extreme_hills_plus_trees_mutated",
  FlowerForest = "minecraft:flower_forest",
  Forest = "minecraft:forest",
  ForestHills = "minecraft:forest_hills",
  FrozenOcean = "minecraft:frozen_ocean",
  FrozenPeaks = "minecraft:frozen_peaks",
  FrozenRiver = "minecraft:frozen_river",
  Grove = "minecraft:grove",
  Hell = "minecraft:hell",
  IceMountains = "minecraft:ice_mountains",
  IcePlains = "minecraft:ice_plains",
  IcePlainsSpikes = "minecraft:ice_plains_spikes",
  JaggedPeaks = "minecraft:jagged_peaks",
  Jungle = "minecraft:jungle",
  JungleEdge = "minecraft:jungle_edge",
  JungleEdgeMutated = "minecraft:jungle_edge_mutated",
  JungleHills = "minecraft:jungle_hills",
  JungleMutated = "minecraft:jungle_mutated",
  LegacyFrozenOcean = "minecraft:legacy_frozen_ocean",
  LukewarmOcean = "minecraft:lukewarm_ocean",
  LushCaves = "minecraft:lush_caves",
  MangroveSwamp = "minecraft:mangrove_swamp",
  Meadow = "minecraft:meadow",
  MegaTaiga = "minecraft:mega_taiga",
  MegaTaigaHills = "minecraft:mega_taiga_hills",
  Mesa = "minecraft:mesa",
  MesaBryce = "minecraft:mesa_bryce",
  MesaPlateau = "minecraft:mesa_plateau",
  MesaPlateauMutated = "minecraft:mesa_plateau_mutated",
  MesaPlateauStone = "minecraft:mesa_plateau_stone",
  MesaPlateauStoneMutated = "minecraft:mesa_plateau_stone_mutated",
  MushroomIsland = "minecraft:mushroom_island",
  MushroomIslandShore = "minecraft:mushroom_island_shore",
  Ocean = "minecraft:ocean",
  Plains = "minecraft:plains",
  RedwoodTaigaHillsMutated = "minecraft:redwood_taiga_hills_mutated",
  RedwoodTaigaMutated = "minecraft:redwood_taiga_mutated",
  River = "minecraft:river",
  RoofedForest = "minecraft:roofed_forest",
  RoofedForestMutated = "minecraft:roofed_forest_mutated",
  Savanna = "minecraft:savanna",
  SavannaMutated = "minecraft:savanna_mutated",
  SavannaPlateau = "minecraft:savanna_plateau",
  SavannaPlateauMutated = "minecraft:savanna_plateau_mutated",
  SnowySlopes = "minecraft:snowy_slopes",
  SoulsandValley = "minecraft:soulsand_valley",
  StoneBeach = "minecraft:stone_beach",
  StonyPeaks = "minecraft:stony_peaks",
  SunflowerPlains = "minecraft:sunflower_plains",
  Swampland = "minecraft:swampland",
  SwamplandMutated = "minecraft:swampland_mutated",
  Taiga = "minecraft:taiga",
  TaigaHills = "minecraft:taiga_hills",
  TaigaMutated = "minecraft:taiga_mutated",
  TheEnd = "minecraft:the_end",
  WarmOcean = "minecraft:warm_ocean",
  WarpedForest = "minecraft:warped_forest",
}
/**
 * Union type equivalent of the MinecraftBiomeTypes enum.
 */
export type MinecraftBiomeTypesUnion = keyof typeof MinecraftBiomeTypes;
